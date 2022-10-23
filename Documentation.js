const Documentation = () => {
    return (
        <div>
            <h1>Ryan & Afdhal's Shop Project Documentation</h1>
            <h3> This page uses 2 npm module packages: fakerjs and react icons</h3>
            <h4>https://fakerjs.dev/guide/ https://react-icons.github.io/react-icons/</h4>
            <h4>FakerJs is an api designed to generate mass amounts of fake information, images, etc. React icons is a package built into react that contains icon images, rather than having to search for them yourself.</h4>
            <br></br>
            <h3>Firstly, the home page contains randomly generated products which are in the theme of collectible toy cars, and you can add and remove them from your shopping cart by pressing the button. In the navbar, there is also a dropdown menu (shopping cart icon) where you can see your added items. You can also remove items in the drop down menu by pressing on the garbage can icon. At the top, you filter out items by searching for specific items. It will appear if the search matches the item name ids. At the left side of the page you have an option to filter out various things such as the pricing, fast shipping, etc. You can also clear your filters by pressing the "clear filters" button. After finding your items, a button will appear in the drop down menu called "go to cart" where it will take you to the checkout page. Here you will see the subtotal of your items and you can choose to add more quantities of the items you already have. You can also remove items from your shopping cart if you made any last minute decisions.</h3>
            <br></br>
            <h1>Link to netlify build: https://ryanafdhalcarshop.netlify.app/</h1>

        </div>
    );
  };
  
  export default Documentation;