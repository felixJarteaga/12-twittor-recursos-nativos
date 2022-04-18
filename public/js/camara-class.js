

class Camara{

  constructor( videoNode ){

    this.videoNode = videoNode;
    console.log('Camara class init');
  }

  encender(){

    navigator.mediaDevices.getUserMedia({
      audio:false,
      video:{ width:300, height:300 }
    }).then( stream => {
      this.videoNode.srcObject = stream;
      this.stream = stream;
    })

  }

  apagar(){

    this.videoNode.pause();

    if (this.stream) {
      this.stream.getTracks()[0].stop();
    }

  }

  tomarFoto(){
    // crear un elemento canvas para renderizar ahi la foto
    let canvas = document.createElement('canvas');

    // colocar las dimensiones del canvas igual ala elemento del video

    canvas.setAttribute('width',300);
    canvas.setAttribute('height',300);

    // obtener el contexto del canvas

    let contex = canvas.getContext('2d'); //una simple imagen

    // dibujar la imagen dentro del canvas
    contex.drawImage( this.videoNode, 0, 0, canvas.width, canvas.height );

    // extraer la foto
    this.foto = contex.canvas.toDataURL();

    // limpieza
    canvas = null;
    contex = null;

    return this.foto;

  }


}