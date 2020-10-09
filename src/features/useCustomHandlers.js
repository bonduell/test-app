import { computed, ref, watch } from "@vue/composition-api";

export default function (items, handlers){
	const
		itemList    = ref(items),
		input       = ref(''),
		counters    = new Map(),
		reducer     = (acc, current) => current(acc, counters, input.value),
		masterList  = computed(() => {
			counters.clear();
			return handlers().reduce(reducer, itemList.value);
		})
	return { input,	masterList }
}
