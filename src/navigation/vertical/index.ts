// ** Icon imports
import Login from "mdi-material-ui/Login";
import Table from "mdi-material-ui/Table";
import CubeOutline from "mdi-material-ui/CubeOutline";
import HomeOutline from "mdi-material-ui/HomeOutline";
import FormatLetterCase from "mdi-material-ui/FormatLetterCase";
import AccountCogOutline from "mdi-material-ui/AccountCogOutline";
import CreditCardOutline from "mdi-material-ui/CreditCardOutline";
import AccountPlusOutline from "mdi-material-ui/AccountPlusOutline";
import AlertCircleOutline from "mdi-material-ui/AlertCircleOutline";
import AccountOutline from "mdi-material-ui/AccountOutline";
import GoogleCirclesExtended from "mdi-material-ui/GoogleCirclesExtended";

// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Imóveis",
      icon: HomeOutline,
      path: "/lista-imoveis",
    },
    {
      title: "Funcionários",
      icon: AccountOutline,
      path: "/funcionarios",
    },
    {
      title: "Login",
      icon: Login,
      path: "/login",
      openInNewTab: true,
    },
    {
      title: "Register",
      icon: AccountPlusOutline,
      path: "/pages/register",
      openInNewTab: true,
    },
  ];
};

export default navigation;
