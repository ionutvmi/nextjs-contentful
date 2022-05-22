import React, { ComponentProps, useEffect, useState } from "react";

const themeList = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
];

const ThemeDropdown: React.FC<{ className?: string }> = ({ className }) => {
    const [selectedTheme, setSelectedTheme] = useState("");
    useEffect(() => {
        setSelectedTheme(window.localStorage.getItem("theme") || "night");
    }, []);

    return (
        <div className={className}>
            <label className="label">
                <span className="label-text">Choose your theme:</span>
            </label>
            <select
                data-choose-theme
                className="select select-bordered"
                title="Select theme"
                onChange={(event) => setSelectedTheme(event.target.value)}
                value={selectedTheme}
            >
                {themeList.map((theme) => (
                    <option key={theme}>{theme}</option>
                ))}
            </select>
        </div>
    );
};
export default ThemeDropdown;
