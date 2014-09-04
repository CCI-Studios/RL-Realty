<?php
/**
 * @file
 * rl_realty_homepage_module.features.inc
 */

/**
 * Implements hook_views_api().
 */
function rl_realty_homepage_module_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function rl_realty_homepage_module_image_default_styles() {
  $styles = array();

  // Exported image style: home_module_thumbnail.
  $styles['home_module_thumbnail'] = array(
    'name' => 'home_module_thumbnail',
    'label' => 'Home Module Thumbnail',
    'effects' => array(
      6 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 180,
          'height' => 120,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}
