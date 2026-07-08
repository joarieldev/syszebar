import type { WeatherOutput, WeatherStatus } from "zebar";
import type { JSX } from "solid-js";
import { Sun } from "../icons/sun";
import { Moon } from "../icons/moon";
import { Cloud } from "../icons/cloud";
import { CloudRain } from "../icons/cloud-rain";
import { CloudSnow } from "../icons/cloud-snow";
import { CloudStorm } from "../icons/cloud-storm";

interface Props {
  weather: WeatherOutput | null;
}

type Icon = (props: { class?: string }) => JSX.Element;

const ICONS: Record<WeatherStatus, Icon> = {
  clear_day: Sun,
  clear_night: Moon,
  cloudy_day: Cloud,
  cloudy_night: Cloud,
  light_rain_day: CloudRain,
  light_rain_night: CloudRain,
  heavy_rain_day: CloudRain,
  heavy_rain_night: CloudRain,
  snow_day: CloudSnow,
  snow_night: CloudSnow,
  thunder_day: CloudStorm,
  thunder_night: CloudStorm,
};

const getWeatherIcon = (status: WeatherStatus) => {
  const Icon = ICONS[status];
  return <Icon class="size-4" />;
};

export const Weather = (props: Props) => {
  return (
    <div class="flex items-center justify-center gap-0.5 px-2">
      <span class="flex justify-center text-icon">
        {props.weather && getWeatherIcon(props.weather.status)}
      </span>
      <span class="tabular-nums w-10 text-center">
        {props.weather ? `${Math.round(props.weather.celsiusTemp)}°C` : "---"}
      </span>
    </div>
  );
};
