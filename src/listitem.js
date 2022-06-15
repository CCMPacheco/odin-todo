function createListItem(name, count) {
  const li = document.createElement("li");

  const spanName = document.createElement("span");
  spanName.classList.add("filter-name");
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
