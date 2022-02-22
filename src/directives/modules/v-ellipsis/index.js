//例子：<div v-ellipsis:100> 需要省略的文字是阿萨的副本阿萨的副本阿萨的副本阿萨的副本</div>

export default {
    inserted(el, binding) {
        let num = binding.arg || 100
        el.style.width = num + 'px'
        el.style.whiteSpace = 'nowrap'
        el.style.overflow = 'hidden';
        el.style.textOverflow = 'ellipsis';
    }
}
