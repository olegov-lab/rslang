export const renderBlockStatist = (classItem, titleItem, countItem: Number | string = 0, classCountItem = "default-item-statist") => `

<div class="${classItem}">
  <p>${titleItem}</p>
  <div class = "count-statist-item">
    <span class="${classCountItem}">${countItem}</span>
  </div>
</div>

`