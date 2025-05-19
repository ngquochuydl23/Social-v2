import moment from "moment";

export const groupByMessage = (messages) => {

  var groupToDayForm = function (group, datetime) {
    return {
      datetime: datetime,
      messages: group
    }
  };

  var result = _.chain(messages)
    .groupBy((obj) => moment(obj.createdAt).format('DD-MMM-YYYY'))
    .map(groupToDayForm)
    .sortBy('datetime')
    .value();

  return result;
}
