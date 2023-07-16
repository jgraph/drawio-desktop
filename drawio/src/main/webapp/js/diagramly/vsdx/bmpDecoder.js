/**
 * @author shaozilee
 *
 * Bmp format decoder,support 1bit 4bit 8bit 24bit bmp
 *
 */

function BmpDecoder(buffer,is_with_alpha) {
  this.pos = 0;
  this.buffer = buffer;
  this.is_with_alpha = !!is_with_alpha;
  //Header should be BM
  if (this.buffer[0] != 66 && this.buffer[1] != 77) throw new Error("Invalid BMP File");
  this.pos += 2;
  this.parseHeader();
  this.parseBGR();
}

BmpDecoder.prototype.parseHeader = function() {
  var b =  this.buffer;
  this.fileSize = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos];
  this.pos += 4;
  this.reserved = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos];
  this.pos += 4;
  this.offset = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.headerSize = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.width = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos];
  this.pos += 4;
  this.height = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.planes = (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 2;
  this.bitPP = (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 2;
  this.compress = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.rawSize = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.hr = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.vr = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.colors = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;
  this.importantColors = (b[this.pos+3] << 24) | (b[this.pos+2] << 16) | (b[this.pos+1] << 8) | b[this.pos]; 
  this.pos += 4;

  if(this.bitPP === 16 && this.is_with_alpha){
    this.bitPP = 15
  };
  if (this.bitPP < 15) {
    var len = this.colors === 0 ? 1 << this.bitPP : this.colors;
    this.palette = new Array(len);
    for (var i = 0; i < len; i++) {
      var blue = this.buffer[this.pos++];
      var green = this.buffer[this.pos++]; 
      var red = this.buffer[this.pos++]; 
      var quad = this.buffer[this.pos++]; 
      this.palette[i] = {
        red: red,
        green: green,
        blue: blue,
        quad: quad
      };
    }
  }

}

BmpDecoder.prototype.parseBGR = function() {
  this.pos = this.offset;
  try {
    var bitn = "bit" + this.bitPP;
    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
	var imageData = ctx.createImageData(this.width, this.height);
	this.imageData = imageData;
    this.data = imageData.data;

    this[bitn]();
  } catch (e) {
    console.log("bit decode error:" + e);
  }

};

BmpDecoder.prototype.bit1 = function() {
  var xlen = Math.ceil(this.width / 8);
  var mode = xlen%4;
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < xlen; x++) {
      var b = this.buffer[this.pos++];
      var location = y * this.width * 4 + x*8*4;
      for (var i = 0; i < 8; i++) {
        if(x*8+i<this.width){
          var rgb = this.palette[((b>>(7-i))&0x1)];
          this.data[location+i*4] = rgb.red;
          this.data[location+i*4 + 1] = rgb.green;
          this.data[location+i*4 + 2] = rgb.blue;
          this.data[location+i*4 + 3] = 0xFF;
        }else{
          break;
        }
      }
    }

    if (mode != 0){
      this.pos+=(4 - mode);
    }
  }
};

BmpDecoder.prototype.bit4 = function() {
  var xlen = Math.ceil(this.width/2);
  var mode = xlen%4;
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < xlen; x++) {
      var b = this.buffer[this.pos++];//this.buffer.readUInt8(this.pos++);
      var location = y * this.width * 4 + x*2*4;

      var before = b>>4;
      var after = b&0x0F;

      var rgb = this.palette[before];
      this.data[location] = rgb.red;
      this.data[location + 1] = rgb.green;
      this.data[location + 2] = rgb.blue;
      this.data[location + 3] = 0xFF;

      if(x*2+1>=this.width)break;

      rgb = this.palette[after];
      this.data[location+4] = rgb.red;
      this.data[location+4 + 1] = rgb.green;
      this.data[location+4 + 2] = rgb.blue;
      this.data[location+4 + 3] = 0xFF;
    }

    if (mode != 0){
      this.pos+=(4 - mode);
    }
  }

};

BmpDecoder.prototype.bit8 = function() {
  var mode = this.width%4;
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < this.width; x++) {
      var b = this.buffer[this.pos++];
      var location = y * this.width * 4 + x*4;
      if(b < this.palette.length) {
        var rgb = this.palette[b];
        this.data[location] = rgb.red;
        this.data[location + 1] = rgb.green;
        this.data[location + 2] = rgb.blue;
        this.data[location + 3] = 0xFF;
      } else {
        this.data[location] = 0xFF;
        this.data[location + 1] = 0xFF;
        this.data[location + 2] = 0xFF;
        this.data[location + 3] = 0xFF;
      }
    }
    if (mode != 0){
      this.pos+=(4 - mode);
    }
  }
};

//Currently not used!
BmpDecoder.prototype.bit15 = function() {
  //FIXED BUG, padding is based on number of bytes not the width
  var dif_w = (this.width * 2) % 4; 
  if (dif_w != 0) {
	  dif_w = 4 - dif_w;
  }
  var _11111 = parseInt("11111", 2),_1_5 = _11111;
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < this.width; x++) {

      var B = (this.buffer[this.pos+1] << 8) | this.buffer[this.pos];
      this.pos+=2;
      var blue = (B & _1_5) / _1_5 * 255 | 0;
      var green = (B >> 5 & _1_5 ) / _1_5 * 255 | 0;
      var red = (B >> 10 & _1_5) / _1_5 * 255 | 0;
      var alpha = (B>>15)?0xFF:0x00;

      var location = y * this.width * 4 + x * 4;
      this.data[location] = red;
      this.data[location + 1] = green;
      this.data[location + 2] = blue;
      this.data[location + 3] = alpha;
    }
    //skip extra bytes
    this.pos += dif_w;
  }
};

//TODO support other RGB masks, e.g., RGB565
BmpDecoder.prototype.bit16 = function() {
  //FIXED BUG, padding is based on number of bytes not the width
  var dif_w = (this.width * 2) % 4;
  if (dif_w != 0) {
	  dif_w = 4 - dif_w;
  }
  var _11111 = parseInt("11111", 2),_1_5 = _11111;
  var _111111 = parseInt("111111", 2),_1_6 = _111111;
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < this.width; x++) {

      var B = (this.buffer[this.pos+1] << 8) | this.buffer[this.pos];
      this.pos+=2;
      var alpha = 0xFF;
      var blue = (B & _1_5) / _1_5 * 255 | 0;
      var green = (B >> 5 & _1_5) / _1_5 * 255 | 0;
      var red = (B >> 10 & _1_5) / _1_5 * 255 | 0;

      var location = y * this.width * 4 + x * 4;
      this.data[location] = red;
      this.data[location + 1] = green;
      this.data[location + 2] = blue;
      this.data[location + 3] = alpha;
    }
    //skip extra bytes
    this.pos += dif_w;
  }
};

BmpDecoder.prototype.bit24 = function() {
  //when height > 0
  //FIXED BUG, padding is based on number of bytes not the width
  var dif_w = ((this.width * 3) % 4);
  if (dif_w != 0) {
	  dif_w = 4 - dif_w;
  }
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < this.width; x++) {
      var blue = this.buffer[this.pos++];
      var green = this.buffer[this.pos++];
      var red = this.buffer[this.pos++];
      var location = y * this.width * 4 + x * 4;
      this.data[location] = red;
      this.data[location + 1] = green;
      this.data[location + 2] = blue;
      this.data[location + 3] = 0xFF;
    }
    //skip extra bytes
    this.pos += dif_w;
  }

};

/**
 * add 32bit decode func 
 * @author soubok
 */
BmpDecoder.prototype.bit32 = function() {
  //when height > 0
  for (var y = this.height - 1; y >= 0; y--) {
    for (var x = 0; x < this.width; x++) {
      var blue = this.buffer[this.pos++];
      var green = this.buffer[this.pos++];
      var red = this.buffer[this.pos++];
      var alpha = this.buffer[this.pos++];
      var location = y * this.width * 4 + x * 4;
      //FIXED BUG alpha is the last byte in image data
      this.data[location] = red;
      this.data[location + 1] = green;
      this.data[location + 2] = blue;
      this.data[location + 3] = alpha;
    }
    //FIXED BUG no padding is needed for 32 bit images "the length of the rows IS a multiple of four bytes"
  }

};

BmpDecoder.prototype.getData = function() {
  return this.data;
};