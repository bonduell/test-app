const sortSubItems = async (items, sorter) => items.forEach(item => item.items && item.items.sort(sorter));

const sortByAsc = (items, counters) => {
	const sorter = (a, b) => counters.get(a) - counters.get(b);
	sortSubItems(items, sorter).catch(err => console.log(err));
	return items.sort(sorter)
};

const sortByDesc = (items, counters) => {
	const sorter = (a, b) => counters.get(b) - counters.get(a);
	sortSubItems(items, sorter).catch(err => console.log(err));
	return items.sort(sorter);
};

// Здесь может быть кастомная реализация сортировки
const anotherSortMethod = (items, counters) => {
	return items;
};

export { sortByAsc, sortByDesc, anotherSortMethod }
