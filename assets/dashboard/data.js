// assets/dashboard/data.js

/**
 * Dashboard页面Mock数据 - 简化版
 * 使用动态日期，确保数据与当前日期匹配
 */

// ========= 辅助函数 =========
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDateBefore(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ========= 主数据对象 =========
const dashboardData = {
  // 报工记录（使用动态日期）
  workRecords: [
    // === ORD-001 绝缘子A型 DW-763 ===
    { id: 'WO-001', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '成型', operator: '张三', operatorId: 'EMP-005', planQty: 1000, completedQty: 585, scrapQty: 15, yield: 97.44, status: 'completed', statusText: '已完成', reportDate: getDateBefore(7), reportTime: getDateBefore(7) + ' 14:30:00' },
    { id: 'WO-002', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '瓷检', operator: '李四', operatorId: 'EMP-006', planQty: 600, completedQty: 420, scrapQty: 8, yield: 98.10, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(7), reportTime: getDateBefore(7) + ' 15:20:00' },
    { id: 'WO-003', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '安装', operator: '王五', operatorId: 'EMP-007', planQty: 500, completedQty: 500, scrapQty: 0, yield: 100.00, status: 'completed', statusText: '已完成', reportDate: getDateBefore(6), reportTime: getDateBefore(6) + ' 10:30:00' },
    { id: 'WO-004', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '上釉', operator: '陈伟', operatorId: 'EMP-021', planQty: 450, completedQty: 380, scrapQty: 12, yield: 96.84, status: 'completed', statusText: '已完成', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 09:10:00' },
    { id: 'WO-005', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '包装', operator: '宋杰', operatorId: 'EMP-030', planQty: 400, completedQty: 350, scrapQty: 5, yield: 98.57, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(2), reportTime: getDateBefore(2) + ' 16:45:00' },

    // === ORD-002 绝缘子B型 DW-665 ===
    { id: 'WO-006', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '成型', operator: '张三', operatorId: 'EMP-005', planQty: 800, completedQty: 320, scrapQty: 45, yield: 85.94, status: 'error', statusText: '异常', reportDate: getDateBefore(6), reportTime: getDateBefore(6) + ' 11:45:00' },
    { id: 'WO-007', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '瓷检', operator: '李四', operatorId: 'EMP-006', planQty: 700, completedQty: 580, scrapQty: 15, yield: 97.41, status: 'completed', statusText: '已完成', reportDate: getDateBefore(5), reportTime: getDateBefore(5) + ' 09:15:00' },
    { id: 'WO-008', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '修理', operator: '王五', operatorId: 'EMP-007', planQty: 350, completedQty: 200, scrapQty: 22, yield: 89.00, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 13:30:00' },
    { id: 'WO-009', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '生检', operator: '钱七', operatorId: 'EMP-008', planQty: 600, completedQty: 520, scrapQty: 10, yield: 98.08, status: 'completed', statusText: '已完成', reportDate: getDateBefore(3), reportTime: getDateBefore(3) + ' 08:20:00' },
    { id: 'WO-010', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '装车', operator: '杨洋', operatorId: 'EMP-022', planQty: 500, completedQty: 450, scrapQty: 8, yield: 98.22, status: 'pending', statusText: '待完成', reportDate: getDateBefore(1), reportTime: getDateBefore(1) + ' 10:00:00' },

    // === ORD-003 绝缘子C型 DW-801 ===
    { id: 'WO-011', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '上釉', operator: '赵六', operatorId: 'EMP-008', planQty: 900, completedQty: 720, scrapQty: 28, yield: 96.11, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(5), reportTime: getDateBefore(5) + ' 14:00:00' },
    { id: 'WO-012', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '成型', operator: '刘丽', operatorId: 'EMP-023', planQty: 1100, completedQty: 980, scrapQty: 35, yield: 96.43, status: 'completed', statusText: '已完成', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 11:10:00' },
    { id: 'WO-013', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '瓷检', operator: '孙八', operatorId: 'EMP-009', planQty: 750, completedQty: 620, scrapQty: 12, yield: 98.06, status: 'completed', statusText: '已完成', reportDate: getDateBefore(3), reportTime: getDateBefore(3) + ' 15:50:00' },
    { id: 'WO-014', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '拉力', operator: '马超', operatorId: 'EMP-027', planQty: 300, completedQty: 280, scrapQty: 3, yield: 98.93, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(2), reportTime: getDateBefore(2) + ' 09:30:00' },
    { id: 'WO-015', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '包装', operator: '宋杰', operatorId: 'EMP-030', planQty: 600, completedQty: 0, scrapQty: 0, yield: 0, status: 'pending', statusText: '待完成', reportDate: getDateBefore(1), reportTime: getDateBefore(1) + ' 07:00:00' },

    // === ORD-004 瓷套管DW-901 ===
    { id: 'WO-016', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '成型', operator: '王五', operatorId: 'EMP-007', planQty: 500, completedQty: 430, scrapQty: 18, yield: 95.81, status: 'completed', statusText: '已完成', reportDate: getDateBefore(7), reportTime: getDateBefore(7) + ' 08:15:00' },
    { id: 'WO-017', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '生检', operator: '周九', operatorId: 'EMP-010', planQty: 450, completedQty: 410, scrapQty: 6, yield: 98.54, status: 'completed', statusText: '已完成', reportDate: getDateBefore(6), reportTime: getDateBefore(6) + ' 14:50:00' },
    { id: 'WO-018', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '上釉', operator: '赵六', operatorId: 'EMP-008', planQty: 400, completedQty: 360, scrapQty: 10, yield: 97.22, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 10:25:00' },
    { id: 'WO-019', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '电检', operator: '吴十', operatorId: 'EMP-011', planQty: 350, completedQty: 300, scrapQty: 8, yield: 97.33, status: 'pending', statusText: '待完成', reportDate: getDateBefore(2), reportTime: getDateBefore(2) + ' 16:10:00' },

    // === ORD-005 支柱绝缘子DW-512 ===
    { id: 'WO-020', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '成型', operator: '陈伟', operatorId: 'EMP-021', planQty: 1200, completedQty: 1050, scrapQty: 40, yield: 96.19, status: 'completed', statusText: '已完成', reportDate: getDateBefore(6), reportTime: getDateBefore(6) + ' 09:40:00' },
    { id: 'WO-021', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '修理', operator: '张三', operatorId: 'EMP-005', planQty: 300, completedQty: 250, scrapQty: 5, yield: 98.00, status: 'completed', statusText: '已完成', reportDate: getDateBefore(5), reportTime: getDateBefore(5) + ' 11:30:00' },
    { id: 'WO-022', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '瓷检', operator: '钱七', operatorId: 'EMP-008', planQty: 900, completedQty: 780, scrapQty: 20, yield: 97.44, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 13:55:00' },
    { id: 'WO-023', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '安装', operator: '郭刚', operatorId: 'EMP-028', planQty: 400, completedQty: 350, scrapQty: 7, yield: 98.00, status: 'completed', statusText: '已完成', reportDate: getDateBefore(2), reportTime: getDateBefore(2) + ' 15:20:00' },
    { id: 'WO-024', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '包装', operator: '何静', operatorId: 'EMP-029', planQty: 500, completedQty: 480, scrapQty: 6, yield: 98.75, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(1), reportTime: getDateBefore(1) + ' 10:35:00' },

    // === ORD-006 避雷器DW-345 ===
    { id: 'WO-025', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '成型', operator: '刘丽', operatorId: 'EMP-023', planQty: 600, completedQty: 520, scrapQty: 16, yield: 96.92, status: 'completed', statusText: '已完成', reportDate: getDateBefore(5), reportTime: getDateBefore(5) + ' 08:50:00' },
    { id: 'WO-026', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '生检', operator: '徐敏', operatorId: 'EMP-026', planQty: 500, completedQty: 460, scrapQty: 9, yield: 98.04, status: 'completed', statusText: '已完成', reportDate: getDateBefore(4), reportTime: getDateBefore(4) + ' 14:15:00' },
    { id: 'WO-027', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '上釉', operator: '杨洋', operatorId: 'EMP-022', planQty: 450, completedQty: 380, scrapQty: 14, yield: 96.32, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(3), reportTime: getDateBefore(3) + ' 09:05:00' },
    { id: 'WO-028', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '电检', operator: '林峰', operatorId: 'EMP-025', planQty: 350, completedQty: 310, scrapQty: 5, yield: 98.39, status: 'pending', statusText: '待完成', reportDate: getDateBefore(1), reportTime: getDateBefore(1) + ' 11:20:00' },
    { id: 'WO-029', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '装车', operator: '黄涛', operatorId: 'EMP-024', planQty: 400, completedQty: 0, scrapQty: 0, yield: 0, status: 'pending', statusText: '待完成', reportDate: getDateBefore(0), reportTime: getDateBefore(0) + ' 06:50:00' },

    // === ORD-007 熔断器DW-234 ===
    { id: 'WO-030', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '成型', operator: '张三', operatorId: 'EMP-005', planQty: 800, completedQty: 680, scrapQty: 25, yield: 96.25, status: 'completed', statusText: '已完成', reportDate: getDateBefore(3), reportTime: getDateBefore(3) + ' 10:30:00' },
    { id: 'WO-031', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '上釉', operator: '赵六', operatorId: 'EMP-008', planQty: 600, completedQty: 510, scrapQty: 18, yield: 96.47, status: 'completed', statusText: '已完成', reportDate: getDateBefore(2), reportTime: getDateBefore(2) + ' 14:40:00' },
    { id: 'WO-032', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '安装', operator: '郭刚', operatorId: 'EMP-028', planQty: 300, completedQty: 150, scrapQty: 30, yield: 80.00, status: 'error', statusText: '异常', reportDate: getDateBefore(1), reportTime: getDateBefore(1) + ' 15:10:00' },
    { id: 'WO-033', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '包装', operator: '宋杰', operatorId: 'EMP-030', planQty: 450, completedQty: 400, scrapQty: 6, yield: 98.50, status: 'in_progress', statusText: '进行中', reportDate: getDateBefore(0), reportTime: getDateBefore(0) + ' 09:00:00' },
  ],
  
  // 计划数据
  planData: [
    // ORD-001 绝缘子A型
    { id: 'PLAN-001', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '成型', planDate: getDateBefore(7), planQty: 1000, actualQty: 585 },
    { id: 'PLAN-002', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '瓷检', planDate: getDateBefore(7), planQty: 600, actualQty: 420 },
    { id: 'PLAN-003', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '安装', planDate: getDateBefore(6), planQty: 500, actualQty: 500 },
    { id: 'PLAN-004', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '上釉', planDate: getDateBefore(4), planQty: 450, actualQty: 380 },
    { id: 'PLAN-005', orderNo: 'ORD-001', productName: '13872', drawingNo: 'DW-763', process: '包装', planDate: getDateBefore(2), planQty: 400, actualQty: 350 },
    // ORD-002 绝缘子B型
    { id: 'PLAN-006', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '成型', planDate: getDateBefore(6), planQty: 800, actualQty: 320 },
    { id: 'PLAN-007', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '瓷检', planDate: getDateBefore(5), planQty: 700, actualQty: 580 },
    { id: 'PLAN-008', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '修理', planDate: getDateBefore(4), planQty: 350, actualQty: 200 },
    { id: 'PLAN-009', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '生检', planDate: getDateBefore(3), planQty: 600, actualQty: 520 },
    { id: 'PLAN-010', orderNo: 'ORD-002', productName: '13765', drawingNo: 'DW-665', process: '装车', planDate: getDateBefore(1), planQty: 500, actualQty: 450 },
    // ORD-003 绝缘子C型
    { id: 'PLAN-011', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '上釉', planDate: getDateBefore(5), planQty: 900, actualQty: 720 },
    { id: 'PLAN-012', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '成型', planDate: getDateBefore(4), planQty: 1100, actualQty: 980 },
    { id: 'PLAN-013', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '瓷检', planDate: getDateBefore(3), planQty: 750, actualQty: 620 },
    { id: 'PLAN-014', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '拉力', planDate: getDateBefore(2), planQty: 300, actualQty: 280 },
    { id: 'PLAN-015', orderNo: 'ORD-003', productName: '13872', drawingNo: 'DW-801', process: '包装', planDate: getDateBefore(1), planQty: 600, actualQty: 0 },
    // ORD-004 瓷套管
    { id: 'PLAN-016', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '成型', planDate: getDateBefore(7), planQty: 500, actualQty: 430 },
    { id: 'PLAN-017', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '生检', planDate: getDateBefore(6), planQty: 450, actualQty: 410 },
    { id: 'PLAN-018', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '上釉', planDate: getDateBefore(4), planQty: 400, actualQty: 360 },
    { id: 'PLAN-019', orderNo: 'ORD-004', productName: '12836', drawingNo: 'DW-901', process: '电检', planDate: getDateBefore(2), planQty: 350, actualQty: 300 },
    // ORD-005 支柱绝缘子
    { id: 'PLAN-020', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '成型', planDate: getDateBefore(6), planQty: 1200, actualQty: 1050 },
    { id: 'PLAN-021', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '修理', planDate: getDateBefore(5), planQty: 300, actualQty: 250 },
    { id: 'PLAN-022', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '瓷检', planDate: getDateBefore(4), planQty: 900, actualQty: 780 },
    { id: 'PLAN-023', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '安装', planDate: getDateBefore(2), planQty: 400, actualQty: 350 },
    { id: 'PLAN-024', orderNo: 'ORD-005', productName: '13872', drawingNo: 'DW-512', process: '包装', planDate: getDateBefore(1), planQty: 500, actualQty: 480 },
    // ORD-006 避雷器
    { id: 'PLAN-025', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '成型', planDate: getDateBefore(5), planQty: 600, actualQty: 520 },
    { id: 'PLAN-026', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '生检', planDate: getDateBefore(4), planQty: 500, actualQty: 460 },
    { id: 'PLAN-027', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '上釉', planDate: getDateBefore(3), planQty: 450, actualQty: 380 },
    { id: 'PLAN-028', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '电检', planDate: getDateBefore(1), planQty: 350, actualQty: 310 },
    { id: 'PLAN-029', orderNo: 'ORD-006', productName: '12836', drawingNo: 'DW-345', process: '装车', planDate: getDateBefore(0), planQty: 400, actualQty: 0 },
    // ORD-007 熔断器
    { id: 'PLAN-030', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '成型', planDate: getDateBefore(3), planQty: 800, actualQty: 680 },
    { id: 'PLAN-031', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '上釉', planDate: getDateBefore(2), planQty: 600, actualQty: 510 },
    { id: 'PLAN-032', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '安装', planDate: getDateBefore(1), planQty: 300, actualQty: 150 },
    { id: 'PLAN-033', orderNo: 'ORD-007', productName: '13765', drawingNo: 'DW-234', process: '包装', planDate: getDateBefore(0), planQty: 450, actualQty: 400 },
  ],
  
  // ========= 统计摘要 =========
  getStats(filters = {}) {
    const filtered = this.filterWorkRecords(filters);
    
    return {
      pending: filtered.filter(r => r.status === 'pending').length,
      inProgress: filtered.filter(r => r.status === 'in_progress').length,
      completed: filtered.filter(r => r.status === 'completed').length,
      scrapped: filtered.reduce((sum, r) => sum + r.scrapQty, 0)
    };
  },
  
  // ========= 数据过滤 =========
  filterWorkRecords(filters = {}) {
    let result = [...this.workRecords];
    
    if (filters.orderNo) {
      result = result.filter(r => r.orderNo === filters.orderNo);
    }
    if (filters.productName) {
      result = result.filter(r => r.productName === filters.productName);
    }
    if (filters.drawingNo) {
      result = result.filter(r => r.drawingNo === filters.drawingNo);
    }
    if (filters.process) {
      result = result.filter(r => r.process === filters.process);
    }
    if (filters.startDate) {
      result = result.filter(r => r.reportDate >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(r => r.reportDate <= filters.endDate);
    }
    
    return result;
  },
  
  filterPlanData(filters = {}) {
    let result = [...this.planData];
    
    if (filters.orderNo) {
      result = result.filter(r => r.orderNo === filters.orderNo);
    }
    if (filters.productName) {
      result = result.filter(r => r.productName === filters.productName);
    }
    if (filters.drawingNo) {
      result = result.filter(r => r.drawingNo === filters.drawingNo);
    }
    if (filters.process) {
      result = result.filter(r => r.process === filters.process);
    }
    if (filters.startDate) {
      result = result.filter(r => r.planDate >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(r => r.planDate <= filters.endDate);
    }
    
    return result;
  },
  
  // ========= 图表数据：达成率 =========
  getAchievementChartData(filters = {}, dimension = 'day') {
    const planData = this.filterPlanData(filters);
    const workData = this.filterWorkRecords(filters);
    
    const timeFormatMap = {
      'day': (date) => date,
      'month': (date) => date.substring(0, 7),
      'quarter': (date) => {
        const [year, month] = date.split('-');
        const q = Math.ceil(parseInt(month) / 3);
        return `${year}-Q${q}`;
      },
      'year': (date) => date.substring(0, 4)
    };
    
    const formatTime = timeFormatMap[dimension];
    
    const planAgg = {};
    planData.forEach(item => {
      const key = formatTime(item.planDate);
      if (!planAgg[key]) planAgg[key] = { planQty: 0, actualQty: 0 };
      planAgg[key].planQty += item.planQty;
    });
    
    workData.forEach(item => {
      const key = formatTime(item.reportDate);
      if (!planAgg[key]) planAgg[key] = { planQty: 0, actualQty: 0 };
      planAgg[key].actualQty += item.completedQty;
    });
    
    const timeKeys = Object.keys(planAgg).sort();
    
    return {
      timeLabels: timeKeys,
      planData: timeKeys.map(key => planAgg[key].planQty),
      actualData: timeKeys.map(key => planAgg[key].actualQty),
      rateData: timeKeys.map(key => {
        const plan = planAgg[key].planQty;
        const actual = planAgg[key].actualQty;
        return plan > 0 ? Math.round((actual / plan) * 100) : 0;
      })
    };
  },
  
  // ========= 图表数据：良率趋势 =========
  getYieldChartData(filters = {}, dimension = 'day') {
    const workData = this.filterWorkRecords(filters);
    
    const timeFormatMap = {
      'day': (date) => date,
      'month': (date) => date.substring(0, 7),
      'quarter': (date) => {
        const [year, month] = date.split('-');
        const q = Math.ceil(parseInt(month) / 3);
        return `${year}-Q${q}`;
      },
      'year': (date) => date.substring(0, 4)
    };
    
    const formatTime = timeFormatMap[dimension];
    
    const yieldAgg = {};
    workData.forEach(item => {
      const key = formatTime(item.reportDate);
      if (!yieldAgg[key]) yieldAgg[key] = { totalYield: 0, count: 0 };
      yieldAgg[key].totalYield += item.yield;
      yieldAgg[key].count += 1;
    });
    
    const timeKeys = Object.keys(yieldAgg).sort();
    
    return {
      timeLabels: timeKeys,
      yieldData: timeKeys.map(key => {
        const agg = yieldAgg[key];
        return agg.count > 0 ? Math.round(agg.totalYield / agg.count) : 0;
      })
    };
  },
  
  // ========= 获取筛选选项 =========
  getFilterOptions() {
    const orders = [...new Set(this.workRecords.map(r => r.orderNo))];
    const products = [...new Set(this.workRecords.map(r => r.productName))];
    const drawings = [...new Set(this.workRecords.map(r => r.drawingNo))];
    const processes = [...new Set(this.workRecords.map(r => r.process))];
    
    return { orders, products, drawings, processes };
  }
};
