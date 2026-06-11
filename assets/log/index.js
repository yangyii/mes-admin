// ========== Log 页面函数 ==========

let logCurrentPage = 1;
let logPageSize = 8;

function renderReportLogTable(data, page, pageSize) {
  const dataSource = data || reportLogData;
  const currentPage = page || logCurrentPage;
  const size = pageSize || logPageSize;

  // 收集筛选条件
  const keyword = (document.getElementById('logSearchInput')?.value || '').toLowerCase();
  const opType = document.getElementById('logOperationTypeFilter')?.value || '';
  const process = document.getElementById('logProcessFilter')?.value || '';

  let filtered = dataSource;

  // 关键词搜索
  if (keyword) {
    filtered = filtered.filter(d =>
      d.id.toLowerCase().includes(keyword) ||
      d.user.toLowerCase().includes(keyword) ||
      d.content.toLowerCase().includes(keyword)
    );
  }

  // 操作类型筛选
  if (opType) {
    filtered = filtered.filter(d => d.operationType === opType);
  }

  // 工序筛选
  if (process) {
    filtered = filtered.filter(d => d.process === process);
  }

  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / size) || 1;
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  logCurrentPage = safePage;

  const start = (safePage - 1) * size;
  const pageData = filtered.slice(start, start + size);

  const tbody = document.getElementById('logTableBody');
  if (!tbody) return;

  if (pageData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:48px 16px;color:#94a3b8;">暂无数据</td></tr>';
    updateStats();
    renderPagination(totalRecords, totalPages, safePage);
    return;
  }

  tbody.innerHTML = pageData.map((item, idx) => {
    const seq = start + idx + 1;
    return `<tr>
      <td style="text-align:center;color:#94a3b8;font-size:13px;font-weight:500;">${seq}</td>
      <td><span style="font-weight:600;color:#1a1a1a;">${item.id}</span></td>
      <td>${item.user}</td>
      <td><span class="op-badge ${getOpBadgeClass(item.operationType)}">${item.operationType}</span></td>
      <td><span class="process-tag">${item.process}</span></td>
      <td style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${item.content}">${item.content}</td>
      <td style="color:#94a3b8;font-size:13px;">${item.ip}</td>
      <td>${item.time}</td>
      <td><span class="status-badge ${item.status === '成功' ? 'normal' : 'error'}">${item.status}</span></td>
    </tr>`;
  }).join('');

  updateStats();
  renderPagination(totalRecords, totalPages, safePage);
}

function getOpBadgeClass(type) {
  const map = { '新增': 'add', '修改': 'edit', '删除': 'delete' };
  return map[type] || 'add';
}

function updateStats() {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = reportLogData.filter(log => log.time.startsWith(today));
  document.getElementById('reportModifyTodayCount').textContent = todayLogs.length;
  document.getElementById('reportModifyWeekCount').textContent = reportLogData.length;
  document.getElementById('reportModifyTotalCount').textContent = reportLogData.length;
}

function searchReportLog() {
  logCurrentPage = 1;
  renderReportLogTable();
}

function goToPage(page) {
  logCurrentPage = page;
  renderReportLogTable();
}

function renderPagination(totalRecords, totalPages, currentPage) {
  const container = document.getElementById('paginationContainer');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div class="pagination-info">共 ${totalRecords} 条，第 ${currentPage} / ${totalPages} 页</div>
    <div class="pagination-controls">
  `;

  // 上一页
  html += `<button class="pagination-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})" ${currentPage <= 1 ? '' : ''}>&lt;</button>`;

  // 页码
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  // 下一页
  html += `<button class="pagination-btn" ${currentPage >= totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">&gt;</button>`;

  html += '</div>';
  container.innerHTML = html;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('logTableBody')) renderReportLogTable();
});
