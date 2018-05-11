/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
import layerTemplate from './templates/layer.mustache';
import indentString from 'indent-string';

  function actualKey(context, key) {    
    return key.replace(/\s/g, '');
  }


  function test()
  {
    return "test";

  }

  function XmlColor(color)
  {
    var hex = color.toHex();
    return `#${hex.r}${hex.g}${hex.b}` 
  }


  function XmlColorRadient(gradient)
  {
    if(gradient.colorStops && gradient.colorStops.length > 0)
      var colorStart = XmlColor(gradient.colorStops[0].color);
    if(gradient.colorStops && gradient.colorStops.length > 1)
    var colorStop = XmlColor(gradient.colorStops[1].color);

    return {
      type:gradient.type,
      angle:gradient.angle,
      scale:gradient.scale,
      colorStart:colorStart,
      colorStop:colorStop
    };
  }

  function XmlFill(fill)
  {
    var stringFill = "";
    var stringFillR;
    if(fill.type == "color")
    {
      stringFill = XmlColor(fill.color);
    }

    if(fill.type == "gradient")
    {
      stringFillR = XmlColorRadient(fill.gradient);
    }
    return {
      fill: stringFill,
      fillRadient: stringFillR
    };
  }

  function XmlBorder(border)
  {
    return {
      position:border.position,
      thickness:border.thickness+"dp",
      fill:XmlFill(border.fill),
    };
  }
  function XmlNumber(number)
  {
    return number + "dp";
  }

  function XmlLayer(context, layer) {
    return {
      key: actualKey(context,layer.name),
      fills:layer.fills.map(fill => XmlFill(fill)),
      borders:layer.borders.map(border => XmlBorder(border)),
      borderRadius:XmlNumber(layer.borderRadius),
      content:layer.content,
    };
  }


function layer(context, selectedLayer) {
  if(selectedLayer.type == "shape")
  {
    const code = indentString(layerTemplate(XmlLayer(context,selectedLayer)));
    return XmlCode(code);
  }
}

function styleguideColors(context, colors) {
    
}

function styleguideTextStyles(context, textStyles) {
}

function exportStyleguideColors(context, colors) {
}

function exportStyleguideTextStyles(context, colors) {
}

function comment(context, text) {

}

function XmlCode(code) {
    return {
      code,
      language: 'swift',
    };
  }

 
  

export default {
    layer,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles,
    comment
};