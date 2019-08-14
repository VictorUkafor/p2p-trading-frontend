<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-6">
                                <h1 class="display-3  text-white">The easiest way to buy and sell Bitcoin, Ethereum & Litecoin.
                                </h1>
                                <div class="btn-wrapper">
                                    <base-button tag="a"
                                                  class="mb-3 mb-sm-0 start-btn"
                                                 type="info">
                                        Get Started
                                    </base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="section section-lg pt-lg-0 mt--200">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                            <div class="col-lg-4">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-primary text-uppercase">Instant Payment</h6>
                                    <p class="description mt-3">When you sell cryptocurrency to us, 
                                    you get paid directly into your Nigerian bank account instantly.</p>
                                </card>
                            </div>
                            <div class="col-lg-4">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="success" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-success text-uppercase">Secure Wallet</h6>
                                    <p class="description mt-3">You can store your cryptocurrencies
                                      securely in the BuyCoins wallet for free.</p>
                                </card>
                            </div>
                            <div class="col-lg-4">
                                <card class="border-0" hover shadow body-classes="py-5">
                                    <icon name="ni ni-check-bold" type="warning" rounded class="mb-4">
                                    </icon>
                                    <h6 class="text-warning text-uppercase">Your Favourite Coins</h6>
                                    <p class="description mt-3">We are the only platform in Africa that 
                                        supports buying, selling, and secure storage of Bitcoin, Ethereum and Litecoin.</p>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<script>
export default {
  name: "Landing",
  components: {}
};
</script>
