<?php

defined('C5_EXECUTE') or die('Access Denied.');

use Concrete\Block\Gallery\Controller;
use Concrete\Core\Entity\File\File;
use Concrete\Core\Entity\File\Version;
use Concrete\Core\View\View;
use Concrete\Core\Page\Page;
use Concrete\Core\Localization\Localization;

/** @var Controller $controller */
/** @var bool $includeDownloadLink */
/** @var int $bID */

$page = $controller->getCollectionObject();
$images = $images ?? [];

$view = View::getInstance();

$view->requireAsset("javascript", "isotope");
$view->requireAsset("javascript", "isotope/packery-layout-mode");

$c = Page::getCurrentPage();

?>

<?php if ($c instanceof Page && $c->isEditMode()) { ?>
    <div class="ccm-edit-mode-disabled-item">
        <?php $loc = Localization::getInstance(); ?>
        <?php $loc->pushActiveContext(Localization::CONTEXT_UI); ?>
        <?php echo t('Gallery Block disabled in edit mode.') ?>
        <?php $loc->popActiveContext(); ?>
    </div>
<?php } else { ?>
<div class="masonry-grid">
    <div class="grid-sizer"></div>

    <?php foreach ($images as $image) { ?>
        <?php /** @var File $image */ ?>
        <?php if ($image['file'] != null) { ?>
            <?php $fileVersion = $image['file']->getApprovedVersion(); ?>
            <?php if ($fileVersion instanceof Version) { ?>
                <div class="grid-item">
                    <div class="grid-inner">
                        <a href="<?php
                        echo h($fileVersion->getThumbnailUrl(null)) ?>" data-gallery-lightbox="true"
                           data-caption="<?php echo h($image['displayChoices']['caption']['value']) ?>"
                           data-download-link="<?php echo h($fileVersion->getForceDownloadURL()); ?>">
                            <!--suppress HtmlRequiredAltAttribute -->
                            <img src="<?php echo h($fileVersion->getURL()); ?>"/>
                        </a>
                    </div>
                </div>
            <?php } ?>
        <?php } ?>
    <?php } ?>
</div>
<?php } ?>