import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export const formatDateOutput = date => {
	return dayjs(date).format('MM.DD.YYYY')
}

export const formatDateInput = date => {
	return dayjs(date, 'MM-DD-YYYY')
}
