<?php

namespace Concrete\Package\MasonryGallery;

use Concrete\Core\Package\Package;

class Controller extends Package
{
    protected string $pkgHandle = 'masonry_gallery';
    protected string $pkgVersion = '0.0.0';
    protected $appVersionRequired = '9.0.0';

    public function getPackageDescription(): string
    {
        return t('A masonry gallery for Concrete CMS.');
    }

    public function getPackageName(): string
    {
        return t('Masonry Gallery');
    }

    public function install(): \Concrete\Core\Entity\Package
    {
        $pkg = parent::install();
        $this->installContentFile("data.xml");
        return $pkg;
    }

    public function upgrade()
    {
        parent::upgrade();
        $this->installContentFile("data.xml");
    }
}
