// assets/dashboard/index.js

/**
 * Dashboard页面主逻辑
 * 职责：
 * 1. 页面初始化（DOM挂载后执行）
 * 2. 事件绑定（筛选器、Tab切换、时间维度切换）
 * 3. 数据过滤和状态管理
 * 4. 图表渲染（ECharts）
 * 5. 表格渲染和分页
 */

// ========== 全局状态 ==========
const dashboardState = {
  // 当前筛选条件
  filters: {
    orderNo: '',
    productName: '',
    drawingNo: '',
    process: '',
    startDate: getDateBefore(7),  // 默认近7日
    endDate: getToday()
  },
  
  // 当前图表状态
  currentChart: 'achievement',    // achievement | yield
  currentTimeDimension: 'day',    // day | month | quarter | year
  
  // 分页状态
  pagination: {
    page: 1,
    size: 10,
    total: 0
  },
  
  // ECharts实例
  chartInstances: {
    achievement: null,
    yield: null
  }
};

// ========== 初始化 ==========
function initDashboard() {
  console.log('Dashboard initializing...');
  
  // 0. 初始化日期输入框值（默认近7日 → 今天）
  document.getElementById('startDate').value = dashboardState.filters.startDate;
  document.getElementById('endDate').value = dashboardState.filters.endDate;
  
  // 1. 初始化筛选器选项
  initFilterOptions();
  
  // 2. 绑定事件
  bindEvents();
  
  // 3. 初始化ECharts实例
  initCharts();
  
  // 4. 首次渲染（使用默认筛选条件）
  refreshDashboard();
  
  console.log('Dashboard initialized');
}

// ========== 筛选器初始化 ==========
function initFilterOptions() {
  const options = dashboardData.getFilterOptions();
  
  // 订单号
  const orderSelect = document.getElementById('filterOrder');
  options.orders.forEach(order => {
    const opt = document.createElement('option');
    opt.value = order;
    opt.textContent = order;
    orderSelect.appendChild(opt);
  });
  
  // 产品名称
  const productSelect = document.getElementById('filterProduct');
  options.products.forEach(product => {
    const opt = document.createElement('option');
    opt.value = product;
    opt.textContent = product;
    productSelect.appendChild(opt);
  });
  
  // 图号
  const drawingSelect = document.getElementById('filterDrawing');
  options.drawings.forEach(drawing => {
    const opt = document.createElement('option');
    opt.value = drawing;
    opt.textContent = drawing;
    drawingSelect.appendChild(opt);
  });
  
  // 工序
  const processSelect = document.getElementById('filterProcess');
  options.processes.forEach(process => {
    const opt = document.createElement('option');
    opt.value = process;
    opt.textContent = process;
    processSelect.appendChild(opt);
  });
}

// ========== 事件绑定 ==========
function bindEvents() {
  // 1. 筛选器变化
  document.getElementById('filterOrder').addEventListener('change', function() {
    dashboardState.filters.orderNo = this.value;
    dashboardState.pagination.page = 1;  // 重置分页
    refreshDashboard();
  });
  
  document.getElementById('filterDrawing').addEventListener('change', function() {
    dashboardState.filters.drawingNo = this.value;
    dashboardState.pagination.page = 1;  // 重置分页
    refreshDashboard();
  });
  
  document.getElementById('filterProduct').addEventListener('change', function() {
    dashboardState.filters.productName = this.value;
    dashboardState.pagination.page = 1;
    refreshDashboard();
  });
  
  document.getElementById('filterProcess').addEventListener('change', function() {
    dashboardState.filters.process = this.value;
    dashboardState.pagination.page = 1;  // 重置分页
    refreshDashboard();
  });
  
  // 2. 时间范围选择器联动
  document.getElementById('startDate').addEventListener('change', function() {
    dashboardState.filters.startDate = this.value;
    dashboardState.pagination.page = 1;
    refreshDashboard();
  });
  
  document.getElementById('endDate').addEventListener('change', function() {
    dashboardState.filters.endDate = this.value;
    dashboardState.pagination.page = 1;
    refreshDashboard();
  });
  
  // 3. 导出按钮
  document.getElementById('btnExport').addEventListener('click', function() {
    showToast('导出功能开发中，敬请期待');
  });
  
  // 4. 图表Tab切换
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // 更新active状态
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 切换图表显示
      const chartType = this.dataset.chart;
      dashboardState.currentChart = chartType;
      
      document.getElementById('chartAchievement').style.display = chartType === 'achievement' ? 'block' : 'none';
      document.getElementById('chartYield').style.display = chartType === 'yield' ? 'block' : 'none';
      
      // 如果图表实例已存在，触发resize
      if (dashboardState.chartInstances[chartType]) {
        dashboardState.chartInstances[chartType].resize();
      }
    });
  });
  
  // 5. 时间维度切换
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新active状态
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新时间维度
      dashboardState.currentTimeDimension = this.dataset.dimension;
      
      // 重新渲染图表
      renderCharts();
    });
  });
}

// ========== 刷新整个Dashboard ==========
function refreshDashboard() {
  // 1. 更新统计卡片
  updateStatsCards();
  
  // 2. 更新图表
  renderCharts();
  
  // 3. 更新表格
  renderTable();
}

// ========== 更新统计卡片 ==========
function updateStatsCards() {
  const stats = dashboardData.getStats(dashboardState.filters);
  
  document.getElementById('statPending').textContent = stats.pending;
  document.getElementById('statInProgress').textContent = stats.inProgress;
  document.getElementById('statCompleted').textContent = stats.completed;
  document.getElementById('statScrapped').textContent = stats.scrapped;
}

// ========== 初始化ECharts实例 ==========
function initCharts() {
  // 达成率图表
  const achievementDom = document.getElementById('chartAchievement');
  dashboardState.chartInstances.achievement = echarts.init(achievementDom);
  
  // 良率图表
  const yieldDom = document.getElementById('chartYield');
  dashboardState.chartInstances.yield = echarts.init(yieldDom);
}

// ========== 渲染图表 ==========
function renderCharts() {
  renderAchievementChart();
  renderYieldChart();
}

// ========== 渲染达成率图表 ==========
function renderAchievementChart() {
  const chartData = dashboardData.getAchievementChartData(
    dashboardState.filters,
    dashboardState.currentTimeDimension
  );
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        let html = '<div style="font-weight:600;margin-bottom:8px;">' + params[0].axisValue + '</div>';
        params.forEach(p => {
          const symbol = p.seriesType === 'line' ? '' : p.marker;
          const unit = p.seriesName === '达成率' ? '%' : '';
          html += '<div style="margin:4px 0;">' + symbol + ' ' + p.seriesName + ': <b>' + p.value + unit + '</b></div>';
        });
        return html;
      }
    },
    legend: {
      data: ['总计划数', '实际完成数', '达成率'],
      top: 10,
      textStyle: { color: '#64748b', fontSize: 13 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.timeLabels,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 12 }
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 12 }
      },
      {
        type: 'value',
        name: '达成率',
        min: 0,
        max: 100,
        axisLabel: { 
          color: '#64748b', 
          fontSize: 12,
          formatter: '{value}%'
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '总计划数',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { 
          color: '#2563eb',
          borderRadius: [4, 4, 0, 0]
        },
        data: chartData.planData
      },
      {
        name: '实际完成数',
        type: 'bar',
        barWidth: '30%',
        itemStyle: { 
          color: '#22c55e',
          borderRadius: [4, 4, 0, 0]
        },
        data: chartData.actualData
      },
      {
        name: '达成率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#f97316', width: 3 },
        itemStyle: { color: '#f97316' },
        data: chartData.rateData
      }
    ]
  };
  
  dashboardState.chartInstances.achievement.setOption(option, true);
}

// ========== 渲染良率图表 ==========
function renderYieldChart() {
  const chartData = dashboardData.getYieldChartData(
    dashboardState.filters,
    dashboardState.currentTimeDimension
  );
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const p = params[0];
        return '<div style="font-weight:600;margin-bottom:8px;">' + p.axisValue + '</div>' +
                '<div>' + p.marker + ' 良率: <b>' + p.value + '%</b></div>';
      }
    },
    legend: {
      data: ['良率'],
      top: 10,
      textStyle: { color: '#64748b', fontSize: 13 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.timeLabels,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '良率(%)',
      min: 0,
      max: 100,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { 
        color: '#64748b', 
        fontSize: 12,
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '良率',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#2563eb', width: 3 },
        itemStyle: { color: '#2563eb' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37,99,235,0.3)' },
              { offset: 1, color: 'rgba(37,99,235,0.05)' }
            ]
          }
        },
        data: chartData.yieldData
      }
    ]
  };
  
  dashboardState.chartInstances.yield.setOption(option, true);
}

// ========== 渲染表格 ==========
function renderTable() {
  // 1. 获取过滤后的数据
  const filteredData = dashboardData.filterWorkRecords(dashboardState.filters);
  
  // 2. 更新分页状态
  dashboardState.pagination.total = filteredData.length;
  
  // 3. 计算当前页数据
  const start = (dashboardState.pagination.page - 1) * dashboardState.pagination.size;
  const end = start + dashboardState.pagination.size;
  const pageData = filteredData.slice(start, end);
  
  // 4. 渲染表格行
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = pageData.map((record, index) => {
    const yieldClass = record.yield >= 95 ? 'high' : (record.yield >= 90 ? 'medium' : 'low');
    
    return `
      <tr>
        <td>${(dashboardState.pagination.page - 1) * dashboardState.pagination.size + index + 1}</td>
        <td>${record.orderNo}</td>
        <td>${record.productName}</td>
        <td>${record.drawingNo}</td>
        <td>${record.process}</td>
        <td>${record.operator}</td>
        <td>${record.completedQty}</td>
        <td>${record.scrapQty}</td>
        <td><span class="yield-cell ${yieldClass}">${record.yield}%</span></td>
        <td><span class="status-badge ${getStatusBadgeClass(record.status)}">${record.statusText}</span></td>
      </tr>
    `;
  }).join('');
  
  // 5. 渲染分页
  renderPagination();
}

// ========== 渲染分页 ==========
function renderPagination() {
  const { page, size, total } = dashboardState.pagination;
  const totalPages = Math.ceil(total / size);
  
  document.getElementById('paginationInfo').textContent = '共 ' + total + ' 条';
  
  const controls = document.getElementById('paginationControls');
  let html = '';
  
  html += '<button class="pagination-btn" onclick="goToPage(1)" ' + (page <= 1 ? 'disabled' : '') + '>«</button>';
  html += '<button class="pagination-btn" onclick="goToPage(' + (page - 1) + ')" ' + (page <= 1 ? 'disabled' : '') + '>‹</button>';
  
  // 显示页码（简化版：只显示当前页和前后各2页）
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    html += '<button class="pagination-btn ' + (i === page ? 'active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
  }
  
  html += '<button class="pagination-btn" onclick="goToPage(' + (page + 1) + ')" ' + (page >= totalPages ? 'disabled' : '') + '>›</button>';
  html += '<button class="pagination-btn" onclick="goToPage(' + totalPages + ')" ' + (page >= totalPages ? 'disabled' : '') + '>»</button>';
  
  controls.innerHTML = html;
}

// ========== 分页跳转 ==========
function goToPage(page) {
  const { total, size } = dashboardState.pagination;
  const totalPages = Math.ceil(total / size);
  
  if (page < 1 || page > totalPages) return;
  
  dashboardState.pagination.page = page;
  renderTable();
}

// ========== 辅助函数 ==========
function getStatusBadgeClass(status) {
  const map = {
    'pending': 'warning',
    'in_progress': 'info',
    'completed': 'normal',
    'error': 'error'
  };
  return map[status] || 'warning';
}

// 窗口resize时重绘图表
window.addEventListener('resize', function() {
  Object.values(dashboardState.chartInstances).forEach(chart => {
    if (chart && chart.resize) chart.resize();
  });
});

// ========= 弹窗功能 =========
function showDetail(recordId) {
  const record = dashboardData.workRecords.find(r => r.id === recordId);
  if (!record) return;
  
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="detail-row"><span class="detail-label">工单号</span><span class="detail-value">${record.orderNo}</span></div>
    <div class="detail-row"><span class="detail-label">产品名称</span><span class="detail-value">${record.productName}</span></div>
    <div class="detail-row"><span class="detail-label">图号</span><span class="detail-value">${record.drawingNo}</span></div>
    <div class="detail-row"><span class="detail-label">工序</span><span class="detail-value">${record.process}</span></div>
    <div class="detail-row"><span class="detail-label">操作员</span><span class="detail-value">${record.operator}</span></div>
    <div class="detail-row"><span class="detail-label">完成数量</span><span class="detail-value">${record.completedQty}</span></div>
    <div class="detail-row"><span class="detail-label">报废数量</span><span class="detail-value">${record.scrapQty}</span></div>
    <div class="detail-row"><span class="detail-label">良率</span><span class="detail-value">${record.yield}%</span></div>
    <div class="detail-row"><span class="detail-label">状态</span><span class="detail-value">${record.statusText}</span></div>
  `;
  
  document.getElementById('viewModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('viewModal').style.display = 'none';
}

// 为弹窗关闭按钮绑定事件（在DOMContentLoaded中）
document.addEventListener('DOMContentLoaded', function() {
  // 关闭按钮事件
  const closeBtn = document.getElementById('btnCloseModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // 点击遮罩关闭
  const modal = document.getElementById('viewModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }
  
  initDashboard();
});
