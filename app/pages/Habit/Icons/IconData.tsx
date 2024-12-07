import {
  faTools,
  faCalculator,
  faFlask,
  faGlobe,
  faBook,
  faLaptopCode,
  faPhone,
  faCode,
  faSearch,
  faChartPie,
  faCog,
  faFilter,
  faSort,
  faTable,
  faUser,
  faQuestion,
  faCamera,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type IconData = {
  faIcon: IconProp;
  isSelected: boolean;
};

export const iconData: IconData[] = [
  {
    faIcon: faTools,
    isSelected: false,
  },
  {
    faIcon: faCalculator,
    isSelected: false,
  },
  {
    faIcon: faFlask,
    isSelected: false,
  },
  {
    faIcon: faGlobe,
    isSelected: false,
  },
  {
    faIcon: faBook,
    isSelected: false,
  },
  {
    faIcon: faLaptopCode,
    isSelected: false,
  },
  {
    faIcon: faPhone,
    isSelected: false,
  },
  {
    faIcon: faCode,
    isSelected: false,
  },
  {
    faIcon: faSearch,
    isSelected: false,
  },
  {
    faIcon: faChartPie,
    isSelected: false,
  },
  {
    faIcon: faCog,
    isSelected: false,
  },
  {
    faIcon: faFilter,
    isSelected: false,
  },
  {
    faIcon: faSort,
    isSelected: false,
  },
  {
    faIcon: faCamera,
    isSelected: false,
  },
  {
    faIcon: faQuestion,
    isSelected: false,
  },
  {
    faIcon: faUser,
    isSelected: false,
  },
  {
    faIcon: faTable,
    isSelected: false,
  },
  {
    faIcon: faCodeBranch,
    isSelected: false,
  },
];

export function textToIcon(iconText: string): IconProp | string {
  switch (iconText) {
    case "faTools":
      return faTools;
    case "faCalculator":
      return faCalculator;
    case "faFlask":
      return faFlask;
    case "faGlobe":
      return faGlobe;
    case "faBook":
      return faBook;
    case "faLaptopCode":
      return faLaptopCode;
    case "faPhone":
      return faPhone;
    case "faCode":
      return faCode;
    case "faSearch":
      return faSearch;
    case "faChartPie":
      return faChartPie;
    case "faCog":
      return faCog;
    case "faFilter":
      return faFilter;
    case "faSort":
      return faSort;
    case "faCamera":
      return faCamera;
    case "faQuestion":
      return faQuestion;
    case "faUser":
      return faUser;
    case "faTable":
      return faTable;
    case "faCodeBranch":
      return faCodeBranch;
    default:
      return "Icon not found";
  }
}
