import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import LabelEntities from "./components/LabelEntities";
import LabelRelations from "./components/LabelRelations";
import DocumentEdit from "./components/DocumentEdit";
import NotFound from "./components/NotFound";

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="label-entities(/:id)" component={LabelEntities}/>
      <Route path="label-relations(/:id)" component={LabelRelations}/>
      <Route path="document-edit(/:id)" component={DocumentEdit}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

// export
export { router };
