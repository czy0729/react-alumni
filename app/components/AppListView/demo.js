const data = [{
    id: 1,
    type: 1,
    name: '秋衣B'，
}, {
    id: 2,
    type: 1,
    name: '秋衣B'，
}, {
    id: 3,
    type: 2,
    name: '秋裤A'，
}];

const section = [{
    title: '衣服',
    filter: (item) => item.type == 1,
}, {
    title: '裤子',
    filter: (item) => item.type == 2,
}];

<AppListView
    data={data}
    section={section}
    renderSectionHeader={(sectionData) => <div>{sectionData}</div>}
    renderRow={(rowData, sectionID, rowID) => <div key={`${sectionID}-${rowID}`}>{rowData}</div>}
/>