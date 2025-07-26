export const useTransformLang = () => {
    const t = message => {
        // TODO: i18n change
        if (!message) return ''

        // 将驼峰式命名转换为多个单词
        let words = message.replace(/([a-z0-9])([A-Z])/g, '$1 $2')

        // 首字母大写
        return words
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    return {
        t,
    }
}
