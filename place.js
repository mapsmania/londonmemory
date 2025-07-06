
class Place 
{
  constructor(name, pt, selected) 
  {
    this.name = name;
    this.pt = pt;
    this.selected = selected;
    
    this.overlay = null;
  }
  
  showOverlay() 
  {
    L.polygon(this.pt, {
		color: 'black',
		fillColor: 'green',
		fillOpacity: 1
	}).addTo(map).bindPopup(this.name);
  }
  
  

  
}

className: 'labelstyle'
