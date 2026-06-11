// ========== Equipment 设备管理页面函数 ==========

// ========== 分页状态 ==========
const eqPageState = {
  currentPage: 1,
  pageSize: 10,
  filteredData: []
};

// ========== 初始化 ==========
function initEquipmentPage() {
  populateProcessFilter();
  filterEquipment();
}

// ========== 填充工序下拉选项 ==========
function populateProcessFilter() {
  const select = document.getElementById('eqProcessFilter');
  if (!select) return;

  // 从数据中提取所有不重复的工序
  const processes = [...new Set(equipmentData.map(d => d.process))];
  processes.sort();

  // 保留第一个 "全部工序" 选项，后续追加
  select.innerHTML = '<option value="">全部工序</option>';
  processes.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

// ========== 获取当前筛选后的完整数据 ==========
function getFilteredEquipmentData() {
  const keyword = document.getElementById('eqSearchInput')?.value.trim().toLowerCase() || '';
  const processFilter = document.getElementById('eqProcessFilter')?.value || '';

  return equipmentData.filter(d => {
    // 关键词搜索：名称 / 型号
    const matchKeyword = !keyword ||
      d.name.toLowerCase().includes(keyword) ||
      d.model.toLowerCase().includes(keyword);
    // 工序筛选
    const matchProcess = !processFilter || d.process === processFilter;
    return matchKeyword && matchProcess;
  });
}

// ========== 搜索/筛选入口 ==========
function filterEquipment() {
  eqPageState.filteredData = getFilteredEquipmentData();
  eqPageState.currentPage = 1;
  renderEquipmentTable();
}

// ========== 渲染设备表格（含分页 & 序号） ==========
function renderEquipmentTable() {
  const tbody = document.getElementById('equipmentTableBody');
  if (!tbody) return;

  const statusMap = { '正常': 'normal', '需维护': 'warning', '故障': 'error' };
  const { currentPage, pageSize, filteredData } = eqPageState;
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // 当前页数据
  const startIndex = (currentPage - 1) * pageSize;
  const pageData = filteredData.slice(startIndex, startIndex + pageSize);

  // 渲染表格行
  tbody.innerHTML = pageData.map((item, idx) => `
    <tr>
      <td>${startIndex + idx + 1}</td>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.model}</td>
      <td>${item.process}</td>
      <td><span class="status-badge ${statusMap[item.status] || 'normal'}">${item.status}</span></td>
      <td>
        <a class="action-link" onclick="editEquipment('${item.id}')">编辑</a>
        <a class="action-link" style="color:#ef4444;margin-left:12px;" onclick="confirmDeleteEquipment('${item.id}','${item.name}')">删除</a>
      </td>
    </tr>
  `).join('');

  // 更新统计卡片
  updateEquipmentStats();

  // 更新分页
  renderPagination(totalItems, totalPages);
}

// ========== 更新统计卡片 ==========
function updateEquipmentStats() {
  const total = equipmentData.length;
  const normal = equipmentData.filter(d => d.status === '正常').length;
  const maintain = equipmentData.filter(d => d.status === '需维护').length;
  const fault = equipmentData.filter(d => d.status === '故障').length;

  const elTotal = document.getElementById('eqTotalCount');
  const elNormal = document.getElementById('eqNormalCount');
  const elMaintain = document.getElementById('eqMaintainCount');
  const elFault = document.getElementById('eqFaultCount');

  if (elTotal) elTotal.textContent = total;
  if (elNormal) elNormal.textContent = normal;
  if (elMaintain) elMaintain.textContent = maintain;
  if (elFault) elFault.textContent = fault;
}

// ========== 分页渲染 ==========
function renderPagination(totalItems, totalPages) {
  const info = document.getElementById('eqPaginationInfo');
  const controls = document.getElementById('eqPaginationControls');
  if (!info || !controls) return;

  info.textContent = `共 ${totalItems} 条，第 ${eqPageState.currentPage} / ${totalPages} 页`;

  const page = eqPageState.currentPage;
  let html = '';

  // 上一页
  html += `<button class="pagination-btn" onclick="goToPage(${page - 1})" ${page <= 1 ? 'disabled' : ''}>&lt;</button>`;

  // 页码（最多显示 7 个，前后加省略号）
  const maxVisible = 7;
  let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    html += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) {
      html += `<span style="padding:0 4px;color:#94a3b8;">…</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="pagination-btn ${i === page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span style="padding:0 4px;color:#94a3b8;">…</span>`;
    }
    html += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }

  // 下一页
  html += `<button class="pagination-btn" onclick="goToPage(${page + 1})" ${page >= totalPages ? 'disabled' : ''}>&gt;</button>`;

  controls.innerHTML = html;
}

// ========== 翻页 ==========
function goToPage(page) {
  const totalPages = Math.max(1, Math.ceil(eqPageState.filteredData.length / eqPageState.pageSize));
  if (page < 1 || page > totalPages) return;
  eqPageState.currentPage = page;
  renderEquipmentTable();
}

// ========== 模态框操作 ==========
// 打开新增设备模态框
function openEquipmentModal() {
  currentEditEquipmentId = null;
  const title = document.getElementById('equipmentModalTitle');
  const name = document.getElementById('eqName');
  const model = document.getElementById('eqModel');
  const process = document.getElementById('eqProcess');
  const status = document.getElementById('eqStatus');
  const modal = document.getElementById('equipmentModal');

  if (title) title.textContent = '新增设备';
  if (name) name.value = '';
  if (model) model.value = '';
  if (process) process.value = '';
  if (status) status.value = '正常';
  if (modal) modal.classList.add('show');
}

// 编辑设备
function editEquipment(id) {
  currentEditEquipmentId = id;
  const item = equipmentData.find(d => d.id === id);
  if (!item) return;

  const title = document.getElementById('equipmentModalTitle');
  const name = document.getElementById('eqName');
  const model = document.getElementById('eqModel');
  const process = document.getElementById('eqProcess');
  const status = document.getElementById('eqStatus');
  const modal = document.getElementById('equipmentModal');

  if (title) title.textContent = '编辑设备';
  if (name) name.value = item.name;
  if (model) model.value = item.model;
  if (process) process.value = item.process;
  if (status) status.value = item.status;
  if (modal) modal.classList.add('show');
}

// 关闭设备模态框
function closeEquipmentModal() {
  const modal = document.getElementById('equipmentModal');
  if (modal) modal.classList.remove('show');
  currentEditEquipmentId = null;
}

// 保存设备
function saveEquipment() {
  const name = document.getElementById('eqName')?.value.trim();
  const model = document.getElementById('eqModel')?.value.trim();
  const process = document.getElementById('eqProcess')?.value.trim();
  const status = document.getElementById('eqStatus')?.value;

  if (!name) { showToast('请输入设备名称'); return; }
  if (!model) { showToast('请输入设备型号'); return; }

  if (currentEditEquipmentId) {
    const index = equipmentData.findIndex(d => d.id === currentEditEquipmentId);
    if (index !== -1) {
      equipmentData[index] = { ...equipmentData[index], name, model, process, status };
      showToast('设备更新成功');
    }
  } else {
    const newId = 'EQ-' + String(equipmentData.length + 1).padStart(3, '0');
    equipmentData.push({ id: newId, name, model, process, status });
    showToast('设备新增成功');
  }

  // 重新填充工序选项并刷新
  populateProcessFilter();
  filterEquipment();
  closeEquipmentModal();
}

// 确认删除设备
function confirmDeleteEquipment(id, name) {
  currentDeleteType = 'equipment';
  currentDeleteId = id;
  const hint = document.getElementById('deleteConfirmHint');
  const modal = document.getElementById('deleteModal');

  if (hint) hint.textContent = `确定要删除设备 "${name}" 吗？此操作不可恢复`;
  if (modal) modal.classList.add('show');
}

// 关闭删除模态框
function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.classList.remove('show');
  }
  currentDeleteType = null;
  currentDeleteId = null;
}

// 确认删除（通用）
function confirmDelete() {
  if (!currentDeleteType || !currentDeleteId) {
    closeDeleteModal();
    return;
  }

  if (currentDeleteType === 'equipment') {
    equipmentData = equipmentData.filter(d => d.id !== currentDeleteId);
    showToast('设备删除成功');
    populateProcessFilter();
    filterEquipment();
  }

  closeDeleteModal();
}

// ========== 导入按钮 ==========
function importEquipment() {
  showToast('导入功能开发中…');
}
