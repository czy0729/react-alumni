/**
 * uploader 修改自react-weui uploader
 * @version 170206 1.0
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Exif from './exif'; //处理图片拍摄时的水平位置
import './index.less';

function rotateImg(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向    
    var min_step = 0;
    var max_step = 3;

    //var img = document.getElementById(pid);    
    if (img == null) return;

    //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
    var height = img.height;
    var width = img.width;

    //var step = img.getAttribute('step');    
    var step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;

        //旋转到原位置，即超过最大值    
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }

    //img.setAttribute('step', step);    
    /*var canvas = document.getElementById('pic_' + pid);   
    if (canvas == null) {   
        img.style.display = 'none';   
        canvas = document.createElement('canvas');   
        canvas.setAttribute('id', 'pic_' + pid);   
        img.parentNode.appendChild(canvas);   
    }  */

    //旋转角度以弧度值为参数    
    var degree = step * 90 * Math.PI / 180;
    var ctx = canvas.getContext('2d');

    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;

        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;

        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;

        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}

export default class Upload extends React.Component {
    static propTypes = {
        maxCount    : React.PropTypes.number,
        maxWidth    : React.PropTypes.number,
        onChange    : React.PropTypes.func,
        onError     : React.PropTypes.func,
        files       : React.PropTypes.array,
        lang        : React.PropTypes.object,
    };

    static defaultProps = {
        maxCount    : 4,
        maxWidth    : 500,
        onChange    : undefined,
        onError     : undefined,
        files       : [],
        lang        : { maxError: maxCount => `最多只能上传${maxCount}张图片` },
    };

    detectVerticalSquash(img) {
        let data;
        let ih = img.naturalHeight;
        let canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = ih;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        try {
            // Prevent cross origin error
            data = ctx.getImageData(0, 0, 1, ih).data;
        } catch (err) {
            // hopeless, assume the image is well and good.
            console.log('Cannot check verticalSquash: CORS?');
            return 1;
        }
        // search image edge pixel position in case it is squashed vertically.
        let sy = 0;
        let ey = ih;
        let py = ih;
        while (py > sy) {
            let alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        let ratio = (py / ih);
        return (ratio===0)?1:ratio;
    }

    handleFile(file, cb) {
        let reader;
        if (typeof FileReader !== 'undefined') {
            reader = new FileReader();
        } else {
            if (window.FileReader) reader = new window.FileReader();
        }

        reader.onload = e => {
            let img;
            if (typeof Image !== 'undefined') {
                img = new Image();
            } else {
                if (window.Image) img = new window.Image();
            }
            img.onload = () => {
                let w = Math.min(this.props.maxWidth, img.width);
                let h = img.height * (w / img.width);
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                //check canvas support, for test
                if (ctx) {
                    //patch subsampling bug
                    //http://jsfiddle.net/gWY2a/24/
                    let drawImage = ctx.drawImage;
                    ctx.drawImage = (img, sx, sy, sw, sh, dx, dy, dw, dh) => {
                        let vertSquashRatio = 1;
                        // Detect if img param is indeed image
                        if (!!img && img.nodeName == 'IMG') {
                            vertSquashRatio = this.detectVerticalSquash(img);
                            sw || (sw = img.naturalWidth);
                            sh || (sh = img.naturalHeight);
                        }

                        // Execute several cases (Firefox does not handle undefined as no param)
                        // by call (apply is bad performance)
                        if (arguments.length == 9)
                            drawImage.call(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
                        else if (typeof sw != 'undefined')
                            drawImage.call(ctx, img, sx, sy, sw, sh / vertSquashRatio);
                        else
                            drawImage.call(ctx, img, sx, sy);
                    };

                    canvas.width = w;
                    canvas.height = h;
                    //ctx.drawImage(img, 0, 0, w, h);

                    /*============*/
                    switch (Exif.getTag(img, 'Orientation')) {
                        case 6: //需要顺时针（向左）90度旋转  
                            //alert('需要顺时针（向左）90度旋转');  
                            rotateImg(img, 'left', canvas);
                            break;
                        case 8: //需要逆时针（向右）90度旋转  
                            // alert('需要顺时针（向右）90度旋转');  
                            rotateImg(img, 'right', canvas);
                            break;
                        case 3: //需要180度旋转  
                            //alert('需要180度旋转');  
                            rotateImg(img, 'right', canvas); //转两次  
                            rotateImg(img, 'right', canvas);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0, w, h);
                    }
                    /*============*/

                    let base64 = canvas.toDataURL('image/png');

                    cb({
                        nativeFile: file,
                        lastModified: file.lastModified,
                        lastModifiedDate: file.lastModifiedDate,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        data: base64
                    }, e);
                } else {
                    cb(file, e);
                }
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    handleChange(e) {
        const langs = this.props.lang;
        let _files = e.target.files;

        if (_files.length === 0) return;

        if (this.props.files.length >= this.props.maxCount) {
            this.props.onError(langs.maxError(this.props.maxCount));
            return;
        }

        for (let key in _files) {
            if (!_files.hasOwnProperty(key)) continue;
            let file = _files[key];

            this.handleFile(file, (_file, e) => {
                if (this.props.onChange) this.props.onChange(_file, e);
                ReactDOM.findDOMNode(this.refs.uploader).value = '';
            }, e);
        }
    }

    renderFiles(){
        return this.props.files.map((file, idx)=>{
            let {url, error, status, onClick, ...others} = file;
            let fileStyle = {
                backgroundImage: `url(${url})`
            };
            let cls = classNames({
                'weui-uploader__file': true,
                'weui-uploader__file_status': error || status
            });

            let handleFileClick = onClick ? onClick : e => {
                if(this.props.onFileClick) this.props.onFileClick(e, file, idx);
            };

            return (
                <li className={cls} key={idx} style={fileStyle} onClick={handleFileClick} {...others}>
                    {
                        error || status ?
                        <div className="weui-uploader__file-content">
                            { error ? <Icon value="warn" /> : status }
                        </div>
                        : false
                    }
                </li>
            );
        });
    }

    render(){
        const { className, maxCount, files, onChange, onFileClick, ...others } = this.props;
        const inputProps = Object.assign({}, others);
        delete inputProps.lang;
        delete inputProps.onError;
        delete inputProps.maxWidth;

        const cls = classNames({
            'weui-uploader': true,
            [className]: className
        });

        return (
            <div className={cls}>
                <div className="weui-uploader__bd">
                    <ul className="weui-uploader__files">
                        {this.renderFiles()}
                    </ul>
                    <div className="weui-uploader__input-box">
                        <input
                            ref="uploader"//let react to reset after onchange
                            className="weui-uploader__input"
                            type="file"
                            accept="image/*"
                            onChange={this.handleChange.bind(this)}
                            {...inputProps}
                        />
                    </div>
                </div>
            </div>
        );
    }
};