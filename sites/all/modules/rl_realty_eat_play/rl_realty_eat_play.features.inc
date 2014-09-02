<?php
/**
 * @file
 * rl_realty_eat_play.features.inc
 */

/**
 * Implements hook_views_api().
 */
function rl_realty_eat_play_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function rl_realty_eat_play_node_info() {
  $items = array(
    'eat_play' => array(
      'name' => t('Eat & Play'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
