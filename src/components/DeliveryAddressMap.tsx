import { AddressType, DeliveryAddressType } from "../types";
import {
  AuthenticationType,
  AzureMap,
  AzureMapsContext,
  AzureMapsProvider,
  IAzureMapOptions,
  IAzureMapsContextProps,
} from "react-azure-maps";
import { data, layer, source } from "azure-maps-control";
import { memo, useContext, useEffect, useState } from "react";

import { LocationDescription } from "../utils";
import { useQuery } from "@tanstack/react-query";

const options: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: import.meta.env.VITE_AZURE_MAPS_KEY,
  },
  zoom: 15,
};

const DeliveryAddressMap = memo((props: { addressString: string }) => {
  const [latlon, setLatlon] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });

  const { data, status } = useQuery({
    queryKey: ["latlon", props],
    queryFn: async () => {
      console.log("addressString Fn: ", props.addressString);
      const res = await fetch(
        `https://atlas.microsoft.com/search/address/json?&subscription-key=${
          import.meta.env.VITE_AZURE_MAPS_KEY
        }&api-version=1.0&language=en-US&query=${props.addressString}`
      );

      const data = await res.json();
      setLatlon({
        lat: data.results[0].position.lat,
        lon: data.results[0].position.lon,
      });

      return data;
    },
    enabled: !!props.addressString,
  });

  console.log("data", data);

  if (latlon.lat !== null && latlon.lon !== null) {
    return (
      <AzureMapsProvider>
        <MapController lat={latlon!.lat} lon={latlon!.lon} />
      </AzureMapsProvider>
    );
  }

  return <></>;
});
export default DeliveryAddressMap;

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

const MapController = memo((props: { lat: number; lon: number }) => {
  const { mapRef, isMapReady } =
    useContext<IAzureMapsContextProps>(AzureMapsContext);
  const changeMapCenter = () => {
    if (mapRef) {
      mapRef.setCamera({
        center: [props.lon, props.lat],
      });
    }
  };

  const addPin = () => {
    if (mapRef) {
      const newPoint = new data.Position(props.lon, props.lat, 0);
      dataSourceRef.add(new data.Feature(new data.Point(newPoint)));
    }
  };

  useEffect(() => {
    if (mapRef) {
      mapRef.sources.add(dataSourceRef);
      mapRef.layers.add(layerRef);
    }
  }, []);

  useEffect(() => {
    if (isMapReady && mapRef && props.lat && props.lon) {
      changeMapCenter();
      addPin();
    }
  }, [isMapReady, props.lat, props.lon]);

  console.log("props", props);

  return (
    <div style={{ height: "300px" }}>
      <AzureMap options={options} />
    </div>
  );
});
