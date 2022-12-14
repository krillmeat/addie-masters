// TODO - Create some kind of space at the bottom of the element if the last subsection is too small

class ContentScrollManager{
  constructor(elem,headingElem){
    this.elem = elem;
    this.headingElem = headingElem;

    this.subsectionPositionArray = this.buildSubsectionPositionArray();
    this.setHeading(this.subsectionPositionArray[0].heading)

    this.attachListeners();
  }

  attachListeners(){
    this.elem.addEventListener('scroll',debounce(this.scrollEvent.bind(this),30))
  }

    scrollEvent(e){
      let currSubsection = this.getCurrentSubsection(e.target.scrollTop);
      this.setHeading(currSubsection.heading)
    }

  buildSubsectionPositionArray(){
    let array = [];
    let subsections = this.elem.querySelectorAll(".sub-section");

    for(let subsection of subsections){
      array.push({
        top: subsection.offsetTop,
        heading: subsection.dataset.heading
      })
    }

    return array;
  }

  getCurrentSubsection(s){
    for(let i in this.subsectionPositionArray){
      if(parseInt(i) === this.subsectionPositionArray.length-1){
        return this.subsectionPositionArray[i]
      } else{
        if((s+100) >= this.subsectionPositionArray[i].top && (s+100) < this.subsectionPositionArray[parseInt(i)+1].top) 
          return this.subsectionPositionArray[i]
      }
    }

    return {top:0,heading:'Busted'}
  }
  
  setHeading(heading){
    this.headingElem.innerHTML = heading;
  }
}
