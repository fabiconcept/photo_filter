let imageChoose = document.getElementById("editThis");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imageChoose.clientWidth;
      canvas.height = imageChoose.clientHeight;
      ctx.filter = filter;
      ctx.scale(flip_H, flip_V)
      ctx.translate(canvas.width/2, canvas.height/2)
      if (rotateValue !== 0) {
        ctx.rotate(rotateValue * Math.PI/180)
      }

      ctx.drawImage(imageChoose, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
      
      const link = document.createElement("a");
      link.download = "fabiEdit.jpg";
      link.href = canvas.toDataURL();
      link.click();