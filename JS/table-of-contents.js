class TableOfContents{
  constructor(elem,sectionClass){
    this.elem = elem;
    this.sections = document.querySelectorAll(`.${sectionClass}`);
    this.positions = this.buildPositionArray();
  }
  
  attachListeners(){
    document.getElementById('section-content').addEventListener('scroll',debounce(this.scrollEvent.bind(this),30));

    for(let mainLink of this.elem.querySelectorAll('ul.main'))
      mainLink.addEventListener('click',this.gotoSection.bind(this))
  }

  gotoSection(e){
    e.stopPropagation();
    let t = e.currentTarget;
    document.getElementById('section-content').scrollTop = this.getSectionTop(t.dataset.heading)
  }

  getSectionTop(heading){
    for(let pos of this.positions) if(pos.heading === heading) return pos.top
    return 0
  }

  scrollEvent(e){
    let currSection = this.getCurrentSection(e.target.scrollTop);
    for(let tocMain of this.elem.querySelectorAll('ul.main')) tocMain.dataset.status='inactive';
    this.elem.querySelector(`ul.main[data-heading='${currSection}']`).dataset.status='active';
  }

  buildTableOfContents(){
    let finalHTML = '';
    for(let section of this.sections){
      finalHTML += `<ul class='main' data-heading='${section.dataset.heading}'><li><a href='#'>${section.dataset.heading}</a></li><li>${this.buildMainSection(section)}</li></ul>`;
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

  buildPositionArray(){
    let array = [];
    for(let section of this.sections){
      array.push({
        heading: section.dataset.heading,
        top: section.offsetTop
      })
    }
    return array;
  }

  getCurrentSection(s){
    for(let i = 0; i < this.positions.length; i++){
      if(i === this.positions.length -1 ) return this.positions[i].heading
      if(s >= this.positions[i].top && s < this.positions[i+1].top ) return this.positions[i].heading
    }
    return ''
  }
}
