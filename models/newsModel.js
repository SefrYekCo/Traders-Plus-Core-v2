const NewsModel = (i) => {
    return {
        id: i.id,
        title: i.title,
        link: i.link,
        pic: i.pic,
        thumb: i.thumb,
        date: i.date,
        text: i.text,
        view: i.view,
      }
}

module.exports = NewsModel