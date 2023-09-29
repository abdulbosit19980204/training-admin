import moment from "moment"
export default {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    formatData(data) {
        return moment(data).format('DD/MM/YYYY')

    }
}