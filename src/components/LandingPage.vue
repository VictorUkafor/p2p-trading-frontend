<template>
    <div class="landing-page landing-page1 landing-body">
        <nav class="navbar navbar-transparent navbar-top" role="navigation">
            <div class="container">

                <div class="navbar-header">
                    <button id="menu-toggle" type="button" class="navbar-toggle"
                    data-toggle="collapse" data-target="#example">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar bar1"></span>
                    <span class="icon-bar bar2"></span>
                    <span class="icon-bar bar3"></span>
                    </button>
                    <a href="">
                        <div class="logo-container">
                            <div class="logo">
                                <img src="../assets/img/new_logo.png" alt="P2P Trading Logo">
                            </div>
                            <div class="brand">P2P Trading</div>
                        </div>
                    </a>
                </div>


            </div>
        </nav>


        <div class="wrapper">
            <div class="parallax filter-gradient blue" data-color="blue">
                <div class="parallax-background">
                    <img class="parallax-background-image" src="../assets/img/template/bg3.jpg">
                </div>
                <div class= "container">
                    <div class="row">
                        <div class="col-md-5 hidden-xs">
                            <div class="parallax-image">
                                <img class="phone" src="../assets/img/template/iphone3.png"
                                style="margin-top: 20px"/>
                            </div>
                        </div>
                        <div class="col-md-6 col-md-offset-1">
                            <div class="description">
                                <h2>The best place to buy and sell Cryptocurrency.</h2>
                                <br>
                                <h5>Yes Indeed! This is the best place in the whole
                                  wide world to buy and sell Bitcoin, Ethereum and Litecoin.
                                </h5>
                                <h5>
                                  P2P Trading is available on all major devices.
                                  Buy cryptocurrency on your iPhone, iPad,
                                  Android phone, or Desktop computer
                                </h5>
                            </div>
                            <div class="buttons">
                                <button class="btn btn-fill btn-basic">
                                <i class="fa fa-play"></i> Get Started
                                </button>
                                <button class="btn btn-fill btn-neutral">
                                <i class="fa fa-apple"></i> Appstore
                                </button>
                                <button class="btn btn-simple btn-neutral">
                                <i class="fa fa-android"></i>
                                </button>
                                <button class="btn btn-simple btn-neutral">
                                <i class="fa fa-windows"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="section section-gray section-clients">
                <div class="container text-center">
                    <h4 class="header-text">Friends in high places</h4>
                    <p>
                        Build customer confidence by listing your users!
                        Anyone who has used your service and has been pleased
                         with it should have a place here! From Fortune 500 to start-ups,
                         all your app enthusiasts will be glad to be featured in this section.
                          Moreover, users will feel confident seing someone
                          vouching for your product!<br>
                    </p>
                    <div class="logos">
                        <ul class="list-unstyled">
                            <li><img src="../assets/img/logos/adobe.png"/></li>
                            <li><img src="../assets/img/logos/zendesk.png"/></li>
                            <li><img src="../assets/img/logos/ebay.png"/></li>
                            <li><img src="../assets/img/logos/evernote.png"/></li>
                            <li><img src="../assets/img/logos/airbnb.png"/></li>
                            <li><img src="../assets/img/logos/zappos.png"/></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="section section-features">
                <div class="container">
                    <h4 class="header-text text-center">We’re unbeatable on the globe</h4>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card card-blue">
                                <div class="icon">
                                    <i class="pe-7s-gleam"></i>
                                </div>
                                <div class="text">
                                    <h4>Instant Payments</h4>
                                    <p>When you sell cryptocurrency to us,
                                      you get paid directly into your
                                      Nigerian bank account instantly.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card card-blue">
                                <div class="icon">
                                    <i class="pe-7s-cash"></i>
                                </div>
                                <h4>Your Favourite Coins</h4>
                                <p>We are the only platform in Africa that supports
                                  buying, selling, and secure storage of
                                  Bitcoin, Ethereum and Litecoin.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card card-blue">
                                <div class="icon">
                                    <i class="pe-7s-lock"></i>
                                </div>
                                <h4>Secure Wallet</h4>
                                <p>You can store your cryptocurrencies
                                  securely in the BuyCoins wallet for free.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <footer class="footer">
          <div class="container">
            <div class="copyright"> &copy; 2019 P2P Trading. All Rights Reserved</div>
          </div>
        </footer>


    </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
@import '../assets/css/bootstrap.css';
@import '../assets/css/landing-page.css';
@import 'http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css';
@import 'http://fonts.googleapis.com/css?family=Open+Sans:300italic,400,300';
@import '../assets/css/pe-icon-7-stroke.css';
@import '../assets/css/custom.css';
</style>
