import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import PointerInteraction from 'ol/interaction/Pointer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { toLonLat } from 'ol/proj';

// 创建地图视图
var view = new View({
  center: [0, 0],
  zoom: 2,
  projection: 'EPSG:4326',
});

// 创建地图对象
var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: view
});

// 创建一个矢量图层用于添加标记
var vectorSource = new VectorSource();
var vectorLayer = new VectorLayer({
  source: vectorSource
});
map.addLayer(vectorLayer);

// 创建点击交互
var clickInteraction = new PointerInteraction({
  handleDownEvent: function(event) {
    // 获取点击位置的坐标
    var coord = map.getCoordinateFromPixel(event.pixel);
    // 将坐标转换为经纬度
    var lonLat = toLonLat(coord);
    // 在控制台输出点击位置的经纬度
    console.log('Clicked coordinates:', lonLat);
    // 在点击位置添加一个标记
    addMarker(coord);
  }
});

// 将点击交互添加到地图上
map.addInteraction(clickInteraction);

// 在地图上添加标记
function addMarker(coord) {
  // 创建标记的几何对象
  var markerGeometry = new Point(coord);
  // 创建标记的特征对象
  var markerFeature = new Feature({
    geometry: markerGeometry
  });
  // 将标记特征添加到矢量图层的数据源中
  vectorSource.addFeature(markerFeature);
}