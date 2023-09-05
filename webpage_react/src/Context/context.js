import React, { useState } from "react";

export const Context = React.createContext(0);
export const ContextProvider = ({ children }) => {
	const [page,setPage] = useState(0);
	function setPageTag(tag){
        setPage(tag)
    }
	return (
		<Context.Provider value={{ page, setPageTag }}>
			{children}
		</Context.Provider>
	);
};
