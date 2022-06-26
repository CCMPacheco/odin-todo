function createListItem(id, name, count) {
  const li = document.createElement("li");

  const spanName = document.createElement("span");
  spanName.classList.add("filter-name");
  spanName.dataset.filterNav = ``;
  spanName.setAttribute("id", id);
  spanName.textContent = name;
  li.appendChild(spanName);

  if (count) {
    const spanCount = document.createElement("span");
    spanCount.classList.add("tasks-count");
    spanCount.textContent = count;
    li.appendChild(spanCount);
  }

  return li;
}

export default createListItem;
