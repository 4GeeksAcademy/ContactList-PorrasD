import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import Contact from "./views/Contact.jsx";
import AddContact from "./views/AddContact.jsx";
import EditContact from "./views/EditContact.jsx";

const Layout = () => {
	const basename = process.env.BASENAME || "";
	return (
		<div>
			<BrowserRouter basename={basename}>
					<Routes>
						<Route path="/addcontact" element={<AddContact />} />
						<Route path="/contacts" element={<Contact />} />
						<Route path="/" element={<Contact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);