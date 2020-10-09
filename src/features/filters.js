
const filterByFieldValue = (itemList, fieldName, fieldValue) => {
	return itemList.filter(item => item[fieldName].value === fieldValue)
};

const filterByMatches = (itemList, counters, search) => {

	if (search === '') { return itemList }

	const
		regExp      = new RegExp(search, 'gi'),
		iterable    = (str) => str.matchAll(regExp),
		matches     = (str) => [...iterable(str)].length,
		reducer     = (acc, current) => {
			counters.set(current, matches(current.name));
			return acc + counters.get(current);
		},
		matchCount  = (item) => matches(item.name) + (item.items ? item.items.reduce(reducer, 0) : 0);

	return itemList
		.filter(item => {
			counters.set(item, matchCount(item));
			return counters.get(item) > 0;
		})
};

// Расширяемый функционал для реализации поиска на основе чистых функций

const customFilter = (searchStr, itemList) => {
	return itemList;
};

export { filterByMatches, filterByFieldValue, customFilter }
