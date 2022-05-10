import { useState } from "react";
import "./directory.styles.scss";

import MenuItem from "../menu-item/menu-item.component.jsx";
import DIRECTORY_DATA from "./directory.data";

const Directory = () => {
  const [sections] = useState(DIRECTORY_DATA);

  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
