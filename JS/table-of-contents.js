class TableOfContents{
  constructor(elem,sectionClass){
    this.elem = elem;
    this.sections = document.querySelectorAll(`.${sectionClass}`)
  }

  buildTableOfContents(){
    console.log("Sections ? ",this.sections);
    let finalHTML = '';
    for(let section of this.sections){
      finalHTML += `<ul class='main'><li><a href='#'>${section.dataset.heading}</a></li><li>${this.buildMainSection(section)}</li></ul>`;
    }

    this.elem.innerHTML = finalHTML;
  }

  buildMainSection(section){
    let subsectionHTML = '';
    for(let subsection of section.querySelectorAll('.sub-section')){
      if(subsection.dataset.heading !== '') subsectionHTML += `<li><a href='#'>${subsection.dataset.heading}</a></li>`
    }
    return `<ul class='subsections'>${subsectionHTML}</ul>`;
  }
}
