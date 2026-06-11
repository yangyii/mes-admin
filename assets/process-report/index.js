// ========== Process-report 页面函数 ==========

const PROCESS_NAMES = ['成型', '修理', '生检', '上釉', '装车', '瓷检', '安装', '拉力', '电检', '包装'];
const DETAIL_COL_COUNT = 1 + 3 + 10 + 10; // 序号1 + 基本信息3 + 工序合格数10 + 工序不合格数10

let selectedOrderId = null;
let currentSummaryData = [];
let currentFilteredByDate = [];  // 经时间段筛选后的全量数据

// ========== 日期工具 ==========
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getOneMonthAgo() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d;
}

// ========== 时间段筛选 ==========
function getDateFilteredData() {
  const startVal = document.getElementById('filterStartDate')?.value;
  const endVal = document.getElementById('filterEndDate')?.value;
  let filtered = processReportData;

  if (startVal) {
    filtered = filtered.filter(d => d.reportDate >= startVal);
  }
  if (endVal) {
    filtered = filtered.filter(d => d.reportDate <= endVal);
  }

  currentFilteredByDate = filtered;
  return filtered;
}

function onDateFilterChange() {
  selectedOrderId = null;
  const data = getDateFilteredData();
  renderSummaryTable(data);
  renderDetailTable(null, data);
}

function setLastMonth() {
  const end = new Date();
  const start = getOneMonthAgo();
  document.getElementById('filterStartDate').value = formatDate(start);
  document.getElementById('filterEndDate').value = formatDate(end);
  onDateFilterChange();
}

// ========== 更新统计卡片 ==========
function updateStats(data) {
  document.getElementById('statTotalOrders').textContent = data.length;
  document.getElementById('statTotalPlan').textContent = data.reduce((s, i) => s + i.planQuantity, 0).toLocaleString();
  document.getElementById('statTotalQualified').textContent = data.reduce((s, i) => s + i.totalQualified, 0).toLocaleString();
  document.getElementById('statTotalLoss').textContent = data.reduce((s, i) => s + i.totalLoss, 0).toLocaleString();
}

// ========== 渲染报工汇总表 ==========
function renderSummaryTable(data) {
  const tbody = document.getElementById('summaryTableBody');
  if (!tbody) return;
  currentSummaryData = data;

  tbody.innerHTML = data.map((item, idx) => {
    const rate = ((item.totalQualified / item.planQuantity) * 100).toFixed(1);
    const isActive = selectedOrderId === item.orderId;
    const rateNum = parseFloat(rate);
    const colorClass = rateNum >= 95 ? 'high' : rateNum >= 80 ? 'medium' : 'low';
    const colorMap = { high: '#22c55e', medium: '#f97316', low: '#ef4444' };
    const color = colorMap[colorClass];

    return `
      <tr class="${isActive ? 'active-row' : ''}" data-order-id="${item.orderId}" onclick="onSummaryRowClick('${item.orderId}')">
        <td style="text-align:center;font-weight:600;color:#64748b;">${idx + 1}</td>
        <td style="font-weight:600;">${item.orderId}</td>
        <td><strong>${item.drawingNo}</strong></td>
        <td>${item.productName}</td>
        <td style="text-align:right;font-weight:600;">${item.planQuantity.toLocaleString()}</td>
        <td style="text-align:right;color:#16a34a;font-weight:700;">${item.totalQualified.toLocaleString()}</td>
        <td style="text-align:right;color:#dc2626;font-weight:700;">${item.totalLoss.toLocaleString()}</td>
        <td>
          <div class="completion-cell">
            <div class="completion-bar-wrap">
              <div class="completion-track">
                <div class="completion-fill ${colorClass}" style="width:${Math.min(rateNum, 100)}%;"></div>
              </div>
              <span class="completion-text" style="color:${color};">${rate}%</span>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">没有匹配的报工记录</td></tr>';
  }

  updateStats(data);
}

// ========== 渲染报工明细表 ==========
function renderDetailTable(orderId, sourceData) {
  const tbody = document.getElementById('detailTableBody');
  if (!tbody) return;

  let ordersToRender = [];
  if (!orderId) {
    // 未选中订单时，展示所有明细数据
    ordersToRender = sourceData;
  } else {
    // 选中某订单时，仅展示该订单
    const order = sourceData.find(d => d.orderId === orderId);
    if (order) ordersToRender = [order];
  }

  if (ordersToRender.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${DETAIL_COL_COUNT}" class="empty-state">没有匹配的明细数据</td></tr>`;
    return;
  }

  tbody.innerHTML = ordersToRender.map((order, idx) => {
    // 工序合格数列 + 工序不合格数列（各 10 列）
    let qualifiedCells = '';
    let lossCells = '';
    PROCESS_NAMES.forEach(name => {
      const p = order.processes[name] || { qualified: 0, loss: 0 };
      let qCls = 'proc-zero';
      if (p.qualified > 0) qCls = 'proc-qualified';
      let lCls = 'proc-zero';
      if (p.loss > 0) lCls = 'proc-loss';
      qualifiedCells += `<td class="${qCls}">${p.qualified.toLocaleString()}</td>`;
      lossCells += `<td class="${lCls}">${p.loss.toLocaleString()}</td>`;
    });

    return `
      <tr>
        <td style="text-align:center;font-weight:600;color:#64748b;">${idx + 1}</td>
        <td style="font-weight:600;">${order.orderId}</td>
        <td><strong>${order.drawingNo}</strong></td>
        <td>${order.productName}</td>
        ${qualifiedCells}
        ${lossCells}
      </tr>
    `;
  }).join('');
}

// ========== 渲染所有内容 ==========
function renderAllTables() {
  setLastMonth();
  const summaryInput = document.getElementById('summarySearchInput');
  if (summaryInput) summaryInput.value = '';
}

// ========== 汇总表行点击 ==========
function onSummaryRowClick(orderId) {
  if (selectedOrderId === orderId) {
    selectedOrderId = null;
    const sourceData = currentFilteredByDate.length ? currentFilteredByDate : processReportData;
    renderSummaryTable(sourceData);
    renderDetailTable(null, sourceData);
    return;
  }
  selectedOrderId = orderId;
  renderSummaryTable(currentSummaryData);
  renderDetailTable(orderId, currentFilteredByDate.length ? currentFilteredByDate : processReportData);
}

// ========== 汇总表搜索（同时控制明细表） ==========
function searchProcessReportSummary() {
  const kw = document.getElementById('summarySearchInput')?.value.toLowerCase().trim();
  const sourceData = currentFilteredByDate.length ? currentFilteredByDate : processReportData;

  if (!kw) {
    selectedOrderId = null;
    renderSummaryTable(sourceData);
    renderDetailTable(null, sourceData);
    return;
  }
  const filtered = sourceData.filter(d =>
    d.orderId.toLowerCase().includes(kw) ||
    d.drawingNo.toLowerCase().includes(kw) ||
    d.productName.toLowerCase().includes(kw)
  );
  const stillExists = selectedOrderId && filtered.some(d => d.orderId === selectedOrderId);
  if (!stillExists) {
    selectedOrderId = null;
    renderDetailTable(null, sourceData);
  }
  renderSummaryTable(filtered);
  if (selectedOrderId && stillExists) {
    renderDetailTable(selectedOrderId, sourceData);
  }
}

function exportProcessReport() {
  showToast('报表导出功能开发中...');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('summaryTableBody')) renderAllTables();
});
