import React from 'react';

const Header = ({address}) => {
  return (
    <div id="page-header" className="row">
      <div className="col-sm-12">
        <h1 className="text-center"> Notepad <br/>
          <span className="small">Address: {address}</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;