const autoHideTabBar = () => {
  let lastScrollTop = 0;

  const handleScroll = (event: any) => {
    const scrollTop = event.detail.scrollTop;
    const tabBar = document.querySelector("ion-tab-bar");

    if (tabBar) {
      if (scrollTop > lastScrollTop) {
        tabBar.classList.add("ion-hide-tabbar");
      } else {
        tabBar.classList.remove("ion-hide-tabbar");
      }
    }

    lastScrollTop = scrollTop;
  };

  return handleScroll;
};

export default autoHideTabBar;
