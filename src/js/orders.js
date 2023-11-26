import cartItemSuperscript from "./superscript";
import { loadHeaderFooter } from "./utils.mjs";
import { orderDisplay } from "./currentOrders.mjs";


await loadHeaderFooter();
cartItemSuperscript();

orderDisplay();


