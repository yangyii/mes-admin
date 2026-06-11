// ========== Log 页面数据 ==========

let reportLogData = [
  { id: 'LOG-20240321-001', user: '张三', operationType: '修改', process: '瓷检', documentType: '完工汇报', documentId: 'RP-001', content: '修改合格数量从500改为570', ip: '192.168.1.105', time: '2024-03-21 14:28:15', status: '成功' },
  { id: 'LOG-20240321-002', user: '李四', operationType: '新增', process: '来料检验', documentType: '来料接收', documentId: 'RCV-001', content: '新增来料接收记录', ip: '192.168.1.108', time: '2024-03-21 14:25:42', status: '成功' },
  { id: 'LOG-20240321-003', user: '王五', operationType: '删除', process: '安装', documentType: '移交下道', documentId: 'TSF-001', content: '删除瓷检工序相关记录', ip: '192.168.1.110', time: '2024-03-21 14:20:18', status: '成功' },
  { id: 'LOG-20240321-004', user: '赵六', operationType: '修改', process: '来料检验', documentType: '来料接收', documentId: 'RCV-001', content: '修改接收数量从1000改为1005', ip: '192.168.1.100', time: '2024-03-21 14:15:30', status: '成功' },
  { id: 'LOG-20240321-005', user: '钱七', operationType: '删除', process: '装配', documentType: '移交下道', documentId: 'TSF-002', content: '删除装配工序不合格记录', ip: '192.168.1.200', time: '2024-03-21 14:10:05', status: '成功' },
  { id: 'LOG-20240321-006', user: '孙八', operationType: '新增', process: '瓷检', documentType: '完工汇报', documentId: 'RP-002', content: '新增瓷检完工汇报记录', ip: '192.168.1.106', time: '2024-03-21 14:05:30', status: '成功' },
  { id: 'LOG-20240321-007', user: '周九', operationType: '修改', process: '装配', documentType: '移交下道', documentId: 'TSF-003', content: '修改装配完成数量从200改为220', ip: '192.168.1.107', time: '2024-03-21 13:58:12', status: '成功' },
  { id: 'LOG-20240321-008', user: '吴十', operationType: '删除', process: '来料检验', documentType: '来料接收', documentId: 'RCV-002', content: '删除重复的来料接收记录', ip: '192.168.1.109', time: '2024-03-21 13:50:45', status: '成功' },
  { id: 'LOG-20240321-009', user: '张三', operationType: '新增', process: '安装', documentType: '完工汇报', documentId: 'RP-003', content: '新增安装工序完工汇报', ip: '192.168.1.105', time: '2024-03-21 13:42:08', status: '成功' },
  { id: 'LOG-20240321-010', user: '李四', operationType: '修改', process: '瓷检', documentType: '完工汇报', documentId: 'RP-001', content: '修改瓷检不良数量从5改为3', ip: '192.168.1.108', time: '2024-03-21 13:35:22', status: '成功' },
  { id: 'LOG-20240321-011', user: '王五', operationType: '修改', process: '装配', documentType: '移交下道', documentId: 'TSF-001', content: '修改移交备注信息', ip: '192.168.1.110', time: '2024-03-21 13:28:55', status: '成功' },
  { id: 'LOG-20240321-012', user: '赵六', operationType: '删除', process: '来料检验', documentType: '来料接收', documentId: 'RCV-003', content: '删除错误录入的来料记录', ip: '192.168.1.100', time: '2024-03-21 13:20:10', status: '成功' },
  { id: 'LOG-20240321-013', user: '钱七', operationType: '新增', process: '安装', documentType: '移交下道', documentId: 'TSF-004', content: '新增安装工序移交记录', ip: '192.168.1.200', time: '2024-03-21 13:12:33', status: '成功' },
  { id: 'LOG-20240321-014', user: '孙八', operationType: '修改', process: '瓷检', documentType: '完工汇报', documentId: 'RP-004', content: '修改瓷检合格率数据', ip: '192.168.1.106', time: '2024-03-21 13:05:47', status: '成功' },
  { id: 'LOG-20240321-015', user: '周九', operationType: '删除', process: '装配', documentType: '移交下道', documentId: 'TSF-005', content: '删除已废弃的装配记录', ip: '192.168.1.107', time: '2024-03-21 12:58:19', status: '成功' }
];
