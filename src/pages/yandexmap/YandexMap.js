import {
  YMaps,
  Map,
  SearchControl,
  TypeSelector,
  ObjectManager,
  ZoomControl,
  TrafficControl,
  FullscreenControl,
  Clusterer,
  Placemark,
} from "@pbe/react-yandex-maps";
import http from "../../axois";
import data from "./data.json";
import img from "../../assets/png/traffic-light.png";
import "./yandex.css";
import { useEffect } from "react";

import { useState } from "react";
const defaultState = {
  center: [41.278967, 69.307571],
  zoom: 12,
  controls: [],
};

function YandexMap() {
  const [traffic, setTraffic] = useState();
  useEffect(() => {
    http.get("/traffic-light/region").then((res) => {
      console.log(res.data.data.features);
      setTraffic(res.data.data);
      
    });
  }, []);
  

  return (
    <>
      {traffic && (
        <YMaps
          className="ymap"
          query={{
            apikey: "27acf1d1-935a-4427-a112-440a9ea8875c",
            lang: "ru_RU",
          }}
        >
          <Map className="map" defaultState={defaultState}>
            <FullscreenControl
              options={{
                fullscreenenter: true,
              }}
            />
            <SearchControl
              options={{
                float: "right",
              }}
            />
            <TrafficControl
              options={{
                float: "right",
              }}
            />
            <TypeSelector
              options={{
                float: "right",
              }}
            />
            <ZoomControl />
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
              }}
            >
              {traffic.features.map((coordinates, index) => (
                <Placemark
                options={
                  {
                      iconLayout: 'default#image',
                      iconImageHref: img
                  }
              }

                key={index} geometry={coordinates.geometry.coordinates} />
              ))}
            </Clusterer>
            {/* <button>yangilash</button> */}
          </Map>
        </YMaps>
      )}
    </>
  );
}

export default YandexMap;
