require('dotenv').config();
const conf = {
  "images": {
    "maxNumberOfImages": process.env.MAX_IMGES || 50,
    "maxImageSize": process.env.MAX_IMAGE_SIZE || 5,
    "minImageSize": process.env.MIN_IMAGE_SIZE || 5000,
    "maxImageRes": process.env.MAX_IMAGE_RES || 20,
    "minImageRes": process.env.MIN_IMAGE_RES || 4,
  },
  "wtp": {
    "apiKey": process.env.WTP_API_KEY,
    "imageScript": "[Images]\r\nvar wptImages = function(win) {\r\n  win = win || window;\r\n  var doc = win.document;\r\n  var images = [];\r\n  var elements = doc.getElementsByTagName(\'*\');\r\n  var re = \/url\\((http.*)\\)\/ig;\r\n  for (var i = 0; i < elements.length; i++) {\r\n    var el = elements[i];\r\n    if (el.tagName == \'IMG\') {\r\n      images.push({\'url\': el.src, \'width\': el.width, \'height\': el.height, \'naturalWidth\': el.naturalWidth, \'naturalHeight\': el.naturalHeight});\r\n    }\r\n\r\n    \/\/ Handle IFrames recursively\r\n    if (el.tagName == \'IFRAME\') {\r\n      try {\r\n        var im = wptImages(el.contentWindow);\r\n        if (im && im.length) {\r\n          images = images.concat(im);\r\n        }\r\n      } catch(e) {}\r\n    }\r\n\r\n    \/\/ TODO: handle any background images (currently not supported.)\r\n  }\r\n  \r\n  return images;\r\n};\r\n\r\nreturn JSON.stringify(wptImages());\r\n\r\n[Dpi]\r\n\/\/ Source code borrowed from: https:\/\/github.com\/ryanve\/res\r\n\r\nvar one = { dpi: 96, dpcm: 96 \/ 2.54 };\r\n\r\nvar ie = function() {\r\n  return Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) \/ one.dpi;\r\n};\r\n\r\nvar dppx = function() {\r\n  \/\/ devicePixelRatio: Webkit (Chrome\/Android\/Safari), Opera (Presto 2.8+), FF 18+\r\n  return typeof window == \'undefined\' ? 0 : +window.devicePixelRatio || ie() || 0;\r\n};\r\n\r\nvar dpcm = function() {\r\n  return dppx() * one.dpcm;\r\n};\r\n\r\nvar dpi = function() {\r\n  return dppx() * one.dpi;\r\n};\r\n\r\nvar calcDpi = function() {\r\n  return { dppx: dppx(), dpcm: dpcm(), dpi: dpi() };\r\n};\r\n\r\nreturn JSON.stringify(calcDpi());\r\n\r\n[Resolution]\r\nvar calcRes = function() {\r\n  return {\r\n    absolute: {\r\n      height: window.screen.height,\r\n      width: window.screen.width\r\n    },\r\n    available: {\r\n      height: window.screen.availHeight,\r\n      width: window.screen.availWidth\r\n    }\r\n  };\r\n};\r\n\r\nreturn JSON.stringify(calcRes());\r\n\r\n[Colordepth]\r\nvar calcColorDepth = function() {\r\n  return window.screen.colorDepth;\r\n}\r\n\r\nreturn JSON.stringify(calcColorDepth());\"\r\n",
    "paths": {
      "imageList": process.env.WTP_IMAGE_LIST_PATH || 'data.median.firstView.Images',
      "rawData": process.env.WTP_IMAGE_RAW_DATA || 'data.median.firstView.requests',
      "dpi": process.env.WTP_DPI_PATH || 'data.median.firstView.Dpi',
      "resolution": process.env.WTP_RES_PATH  || 'data.median.firstView.Resolution',
      "screenShot": process.env.WTP_SCREENSHOT_PATH || 'data.median.firstView.images.screenShot',
      "location": process.env.WTP_LOCATION_PATH || 'data.location',
      "url": process.env.WTP_URL_PATH || 'data.url',
      "browserName": process.env.WTP_BROWSER_NAME_PATH || 'data.median.firstView.browser_name',
      "browserVer": process.env.WTP_BROWSER_VER_PATH || 'data.median.firstView.browser_version'
    },
    timeout: process.env.WTP_TIMEOUT || 30000
  },
  "cloudinary": {
    "cloudName": process.env.CLOUDINARY_NAME,
    "apiKey": process.env.CLOUDINARY_API,
    "secret": process.env.CLOUDINARY_SEACRET,
    "batchSize": process.env.CLOUDINARY_BATCH || 50,
    "transformations": process.env.CLOUDINARY_TRANSF || 'auto'
  }
};

module.exports = conf;