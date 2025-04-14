<?php

namespace Concrete\Package\MasonryGallery;

use Concrete\Core\Asset\AssetInterface;
use Concrete\Core\Asset\AssetList;
use Concrete\Core\Package\Package;

class Controller extends Package
{
    protected string $pkgHandle = 'masonry_gallery';
    protected string $pkgVersion = '0.0.2';
    protected $appVersionRequired = '9.0.0';

    public function getPackageDescription(): string
    {
        return t('A masonry gallery template for Concrete CMS.');
    }

    public function getPackageName(): string
    {
        return t('Masonry Gallery');
    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register("javascript", "isotope", "js/isotope.js", ["position" => AssetInterface::ASSET_POSITION_FOOTER, "version" => "3.0.6"], "masonry_gallery");
        $al->register("javascript", "isotope/packery-layout-mode", "js/packery-mode.js", ["position" => AssetInterface::ASSET_POSITION_FOOTER, "version" => "2.0.1"], "masonry_gallery");
    }
}
