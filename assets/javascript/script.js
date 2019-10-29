console.clear();

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = 100,
    h = canvas.height = 100,
    TWOPI = Math.PI * 2,
    count = 0,
    blocks = 10;

function render(){
  requestAnimationFrame(render);

  var cx = w/1,
      cy = h/2,
      blockSize = h / blocks;

  for (var i = 0; i < blocks; i++){
    ctx.fillStyle = 'hsl(' +
      ( 360 * Math.abs(Math.sin( ((i / blocks)) + count)) ) +
      ', 100%, 85%)';
    ctx.fillRect(-w,i * blockSize, w * 2, blockSize );
  }

  document.body.style.setProperty('--image', 'url('+canvas.toDataURL()+ ')');
  count += 0.001;
}
  render();
