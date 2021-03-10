import { shallow } from "enzyme";
import React from 'react'
import Header from "./Header";
import '../setupTests'

it("renders without crashing", () => {
    shallow(<Header />);
});

it("renders calendar header", () => {
    const wrapper = shallow(<Header />);
    const firstLogo = <h2>Calendar</h2>;
    const secondLogo = <h2>WordPress</h2>
    expect(wrapper.contains(firstLogo, secondLogo)).toEqual(true);
});


