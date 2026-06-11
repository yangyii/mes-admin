// ========== Report-complete 页面函数 ==========

// 分页状态
let completeCurrentPage = 1;
let completePageSize = 10;
let completeFilteredData = reportRecordData;

function renderCompleteTable(data = reportRecordData) {
  completeFilteredData = data;
  completeCurrentPage = 1;

  // 计算总页数和当前页数据
  const totalPages = Math.max(1, Math.ceil(completeFilteredData.length / completePageSize));
  const start = (completeCurrentPage - 1) * completePageSize;
  const pageData = completeFilteredData.slice(start, start + completePageSize);

  renderCompleteTableNew(pageData, start);
  renderCompletePagination(completeFilteredData.length);

  // 更新统计
  const totalQualified = reportRecordData.reduce((sum, r) => sum + (r.qualifiedQty || 0), 0);
  const totalScrap = reportRecordData.reduce((sum, r) => sum + (r.scrapQty || 0), 0);
  const planTotal = planOrderData.length;

  document.getElementById('completeDoneCount').textContent = totalQualified;
  document.getElementById('completeIssueCount').textContent = totalScrap;
  document.getElementById('completeTotalCount').textContent = planTotal;
}

function renderCompleteTableNew(data, startIndex = 0) {
  const tbody = document.getElementById('completeTableBody');
  if (!tbody) return;

  tbody.innerHTML = data.map((r, i) => {
    // 查找该报工关联的生产订单
    const details = planReportDetailData.filter(d => d.reportId === r.id);
    const relatedPlans = [...new Set(details.map(d => d.planOrderId))];

    // 计算良率
    const yieldRate = r.reportQty > 0
      ? ((r.qualifiedQty / r.reportQty) * 100).toFixed(1) + '%'
      : '-';

    return `
    <tr>
      <td style="text-align:center;color:#94a3b8;">${startIndex + i + 1}</td>
      <td><strong>${r.id}</strong></td>
      <td>${r.drawingNo}</td>
      <td>${r.process}</td>
      <td>${r.reportQty}</td>
      <td>${r.qualifiedQty}</td>
      <td style="color:${r.scrapQty>0?'#991b1b':'#1a1a1a'}">${r.scrapQty}</td>
      <td>${yieldRate}</td>
      <td>${relatedPlans.length > 0 ? relatedPlans.join(', ') : '未关联'}</td>
      <td>${r.operator}</td>
      <td>${r.equipment}</td>
      <td>${r.workTime}</td>
      <td>
        <a class="action-link" onclick="editReport('${r.id}')">修改</a>
        <a class="action-link" onclick="deleteReport('${r.id}')" style="color:#e53e3e;">删除</a>
      </td>
    </tr>
  `}).join('');
}

function renderCompletePagination(total) {
  const totalPages = Math.max(1, Math.ceil(total / completePageSize));

  // 更新信息
  const info = document.getElementById('completePaginationInfo');
  info.textContent = total > 0
    ? `共 ${total} 条，第 ${completeCurrentPage}/${totalPages} 页`
    : '共 0 条';

  // 更新翻页按钮状态
  document.getElementById('completePageFirst').disabled = completeCurrentPage <= 1;
  document.getElementById('completePagePrev').disabled = completeCurrentPage <= 1;
  document.getElementById('completePageNext').disabled = completeCurrentPage >= totalPages;
  document.getElementById('completePageLast').disabled = completeCurrentPage >= totalPages;

  // 生成页码按钮
  const pageNumbers = document.getElementById('completePageNumbers');
  let html = '';
  const maxVisible = 5;
  let startPage = Math.max(1, completeCurrentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let p = startPage; p <= endPage; p++) {
    html += `<button class="pagination-btn${p === completeCurrentPage ? ' active' : ''}" onclick="goToCompletePage(${p})">${p}</button>`;
  }
  pageNumbers.innerHTML = html;
}

function goToCompletePage(page) {
  const totalPages = Math.max(1, Math.ceil(completeFilteredData.length / completePageSize));
  if (page < 1 || page > totalPages) return;

  completeCurrentPage = page;

  const start = (completeCurrentPage - 1) * completePageSize;
  const pageData = completeFilteredData.slice(start, start + completePageSize);
  renderCompleteTableNew(pageData, start);
  renderCompletePagination(completeFilteredData.length);
}

function changeCompletePageSize(size) {
  completePageSize = parseInt(size, 10);
  completeCurrentPage = 1;
  renderCompleteTable(completeFilteredData);
}

function searchCompleteData() {
  const kw = document.getElementById('completeSearchInput')?.value.toLowerCase();
  if (!kw) {
    renderCompleteTable(reportRecordData);
    return;
  }
  const filtered = reportRecordData.filter(d =>
    d.id.toLowerCase().includes(kw) ||
    d.drawingNo.toLowerCase().includes(kw) ||
    d.process.toLowerCase().includes(kw) ||
    d.operator.toLowerCase().includes(kw)
  );
  completeFilteredData = filtered;
  completeCurrentPage = 1;

  const totalPages = Math.max(1, Math.ceil(filtered.length / completePageSize));
  const start = 0;
  const pageData = filtered.slice(0, completePageSize);

  renderCompleteTableNew(pageData, 0);
  renderCompletePagination(filtered.length);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById("completeTableBody")) renderCompleteTable();
});
